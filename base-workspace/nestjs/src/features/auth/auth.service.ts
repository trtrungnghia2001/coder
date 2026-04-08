import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  UpdateMeDto,
  VerifyEmailDto,
} from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigProps } from '@app/common/config/env.configuration';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadData } from '@app/common/types';
import { CloudinaryService } from '@app/common/config/cloudinary/cloudinary.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { MailerService } from '@nestjs-modules/mailer';
import { emailTemplates } from '@app/common/templates/emailTempaltes';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvConfigProps>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly mailerService: MailerService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async hashedPassword(password: string) {
    // hash password
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async createAndSaveTokens(userId: string, payload: JwtPayloadData) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.refreshSecret', { infer: true }),
        expiresIn: this.configService.get('jwt.refreshExpiresIn', {
          infer: true,
        }),
      }),
    ]);

    // save refresh_token
    const ttl = 7 * 24 * 60 * 60; // 7 ngày tính bằng giây
    await this.redis.set(`refresh_token:${userId}`, refreshToken, 'EX', ttl);

    return { accessToken, refreshToken };
  }

  async removeRefreshToken(refreshToken: string) {
    // 1. Verify Refresh Token để lấy User ID
    const payload: JwtPayloadData = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: this.configService.get('jwt.refreshSecret', { infer: true }),
      },
    );

    if (payload && payload.sub) {
      // 2. Xóa Refresh Token tương ứng trong Redis
      await this.redis.del(`refresh_token:${payload.sub}`);
    }
  }

  async sendVerificationEmail(userId: string, email: string, username: string) {
    const verifyToken = crypto.randomUUID();

    // Lưu Redis (24h)
    await this.redis.set(`verify_email:${verifyToken}`, email, 'EX', 86400);

    try {
      const verifyLink = `${this.configService.get('websiteUrl', { infer: true })}/verify-email?token=${verifyToken}`;
      await this.mailerService.sendMail({
        to: email,
        subject: 'Activate your account',
        html: emailTemplates.verifyEmail(username, verifyLink),
      });

      return {
        message: 'A verification link has been sent to your email.',
        userId,
      };
    } catch (error: unknown) {
      await this.redis.del(`verify_email:${verifyToken}`);
      if (error instanceof Error) {
        this.logger.error(`Login error for ${email}: ${error.message}`);
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException(
        'An error occurred while sending the email.',
      );
    }
  }

  //
  async register(dto: RegisterDto) {
    const { email, password, username } = dto;

    const user = await this.userService.findByEmail(email);

    if (user) {
      // NẾU ĐÃ ACTIVE -> Chặn (Lỗi cũ)
      if (user.isVerified) {
        throw new ConflictException(
          'This email address is already registered!',
        );
      }

      // NẾU CHƯA ACTIVE -> Coi như đăng ký lại để lấy mã mới
      const hashedPassword = await this.hashedPassword(password);
      await this.userService.updateOne(user.id, {
        username,
        password: hashedPassword,
      });

      await this.sendVerificationEmail(user.id, email, username);

      return user;
    }

    const hashedPassword = await this.hashedPassword(password);

    const newUser = await this.userService.create({
      email,
      username,
      password: hashedPassword,
    });

    await this.sendVerificationEmail(newUser.id, email, username);

    return newUser;
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const { token } = dto;
    const email = await this.redis.get(`verify_email:${token}`);
    if (!email) throw new BadRequestException('Token invalid or expired');

    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found.');

    // Nếu User đã kích hoạt rồi thì báo lỗi hoặc return luôn
    if (user.isVerified) {
      await this.redis.del(`verify_email:${token}`); // Dọn dẹp nốt nếu còn
      throw new BadRequestException('Account has already been verified.');
    }

    await this.userService.updateOne(user.id, { isVerified: true });
    await this.redis.del(`verify_email:${token}`);
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password!');

    // compare password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword)
      throw new UnauthorizedException('Invalid email or password!');

    // Check xem đã verify chưa sau khi đã đúng pass
    if (!user.isVerified) {
      throw new ForbiddenException(
        'Please verify your email before logging in.',
      );
    }

    const payload: JwtPayloadData = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } = await this.createAndSaveTokens(
      user.id,
      payload,
    );

    return { user, accessToken, refreshToken };
  }

  async profile(userId: string) {
    return await this.userService.findOne(userId);
  }

  async updateMe(userId: string, dto: UpdateMeDto, file?: Express.Multer.File) {
    let avatarData = {};

    if (file) {
      // 1. Lấy thông tin user hiện tại để xem có ảnh cũ không
      const currentUser = await this.userService.findOne(userId);

      // 2. Upload ảnh mới
      const uploadFile = await this.cloudinaryService.uploadFile(file);

      // 3. Nếu upload thành công, chuẩn bị data để update
      avatarData = {
        avatarUrl: uploadFile.secure_url as string,
        avatarId: uploadFile.public_id as string,
      };

      // 4. Xóa ảnh cũ trên Cloudinary (nếu có) để tiết kiệm dung lượng
      if (currentUser.avatarId) {
        await this.cloudinaryService.deleteFile(currentUser.avatarId);
      }
    }

    // 5. Cập nhật vào Database
    return await this.userService.updateOne(userId, {
      ...dto,
      ...avatarData,
    });
  }

  async changePassword(userId: string, email: string, dto: ChangePasswordDto) {
    const { oldPassword, confirmPassword, newPassword } = dto;

    // check old password in database
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found.');
    const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isMatchPassword) {
      throw new BadRequestException('The old password is incorrect.');
    }

    // validate
    if (oldPassword === newPassword)
      throw new BadRequestException(
        `The new password must not be the same as the old password.`,
      );
    if (confirmPassword !== newPassword)
      throw new BadRequestException(
        `The authentication password doesn't match.`,
      );

    // hash and save
    const hashedPassword = await this.hashedPassword(newPassword);

    await this.userService.updateOne(userId, { password: hashedPassword });
  }

  async refreshToken(refreshToken: string) {
    try {
      // 1. Verify token. Nếu hết hạn/sai, nó sẽ nhảy xuống block catch
      const payload: JwtPayloadData = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get('jwt.refreshSecret', { infer: true }),
        },
      );

      // 2. Lấy token từ Redis để so sánh (Whitelist)
      const savedToken = await this.redis.get(`refresh_token:${payload.sub}`);

      // 3. Kiểm tra tính hợp lệ của Token trong Redis
      if (!savedToken || savedToken !== refreshToken) {
        throw new UnauthorizedException('Refresh Token invalid or revoked');
      }

      // 4. Mọi thứ OK -> Tạo bộ token mới (Rotation)
      const tokens = await this.createAndSaveTokens(payload.sub, {
        email: payload.email,
        role: payload.role,
        sub: payload.sub,
      });

      return tokens;
    } catch {
      // Nếu verifyAsync thất bại (hết hạn), ta bắt lỗi ở đây
      throw new UnauthorizedException('Refresh Token expired or invalid');
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const { email } = dto;

    // 1. Kiểm tra User tồn tại
    const user = await this.userService.findByEmail(email);
    if (!user) {
      // Bảo mật: Có thể return luôn "Vui lòng check mail" để tránh lộ email tồn tại
      throw new NotFoundException(
        'The user with this email address does not exist.',
      );
    }

    // 2. Tạo Token Reset Password (tạm thời)
    const resetToken = crypto.randomUUID();
    const ttl = 15 * 60; // 15 phút tính bằng giây

    // 3. Gửi Mail
    try {
      await this.redis.set(`reset_password:${resetToken}`, email, 'EX', ttl);

      // Link này Frontend sẽ hứng và gửi kèm token + email lên API Reset
      const resetLink = `${this.configService.get('websiteUrl', { infer: true })}/reset-password?token=${resetToken}`;

      await this.mailerService.sendMail({
        to: email,
        subject: 'Recover your password',
        html: emailTemplates.forgotPassword(user.username, resetLink),
      });
    } catch (error: unknown) {
      await this.redis.del(`reset_password:${resetToken}`);
      if (error instanceof Error) {
        this.logger.error(`Login error for ${email}: ${error.message}`);
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException(
        'An error occurred while sending the email.',
      );
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { token, password, confirmPassword } = dto;

    if (confirmPassword !== password)
      throw new BadRequestException(
        `The authentication password doesn't match.`,
      );

    // 1. Tìm email dựa trên token
    const email = await this.redis.get(`reset_password:${token}`);

    // 2. Nếu không thấy email trong Redis -> Token sai hoặc hết hạn
    if (!email) {
      throw new UnauthorizedException(
        'Mã xác nhận không hợp lệ hoặc đã hết hạn.',
      );
    }

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    // 3. Tiến hành đổi mật khẩu cho email vừa tìm được
    const hashedPassword = await this.hashedPassword(password);
    await this.userService.updateOne(user.id, { password: hashedPassword });

    // 4. Xóa token ngay lập tức
    await this.redis.del(`reset_password:${token}`);

    // 5. Gửi Mail
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Khôi phục mật khẩu của bạn',
        html: emailTemplates.resetSuccess(user.username),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Login error for ${email}: ${error.message}`);
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException(
        'An error occurred while sending the email.',
      );
    }
  }
}
