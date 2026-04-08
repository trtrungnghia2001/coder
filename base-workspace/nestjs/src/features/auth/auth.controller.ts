import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  UpdateMeDto,
  VerifyEmailDto,
} from './dto/auth.dto';
import { ApiResponse, type RequestWithUser } from '@app/common/types';
import { User } from '../user/user.entity';
import { type Request, type Response } from 'express';
import {
  COOKIE_DEFAULT_OPTIONS,
  MULTER_IMAGE_OPTIONS,
} from '@app/common/constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

type Login = { user: User; accessToken: string };
type AuthResponse = Promise<
  ApiResponse<
    | User
    | null
    | Login
    | {
        accessToken: string;
      }
  >
>;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  saveTokenCookie(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      ...COOKIE_DEFAULT_OPTIONS,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      ...COOKIE_DEFAULT_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @Post('register')
  async register(@Body() body: RegisterDto): AuthResponse {
    const data = await this.authService.register(body);
    return {
      data,
      message:
        'Register successfully!. Please check your email to activate your account.',
      statusCode: HttpStatus.CREATED,
      success: true,
    };
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() body: VerifyEmailDto): AuthResponse {
    await this.authService.verifyEmail(body);
    return {
      data: null,
      message: 'Account verified successfully!',
      statusCode: HttpStatus.OK,
      success: true,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response, //Dùng passthrough để vẫn return được object,
  ): AuthResponse {
    const { user, accessToken, refreshToken } =
      await this.authService.login(body);

    this.saveTokenCookie(res, accessToken, refreshToken);

    return {
      data: { user, accessToken },
      message: 'Login successfully!',
      statusCode: HttpStatus.OK,
      success: true,
    };
  }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req: Request) {}

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   // Dữ liệu user nằm trong req.user nhờ hàm validate() ở trên
  //   return {
  //     message: 'Login thành công!',
  //     user: req.user,
  //   };
  // }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response, //Dùng passthrough để vẫn return được object,
  ): AuthResponse {
    const refreshToken = req.cookies['refreshToken'] as string | null;

    if (refreshToken) {
      try {
        await this.authService.removeRefreshToken(refreshToken);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error({ error });
        }
        console.error('Logout: Refresh token expired or invalid');
      }
    }

    res.clearCookie('accessToken', COOKIE_DEFAULT_OPTIONS);
    res.clearCookie('refreshToken', COOKIE_DEFAULT_OPTIONS);

    return {
      data: null,
      message: 'Logout successfully!',
      statusCode: HttpStatus.OK,
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: RequestWithUser): AuthResponse {
    const userId = req.user.id;
    const data = await this.authService.profile(userId);

    return {
      data: data,
      message: 'Find successfully!',
      success: true,
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-me')
  @UseInterceptors(FileInterceptor('avatarFile', MULTER_IMAGE_OPTIONS)) // 'avatarFile' là key trong FormData của FE
  async updateMe(
    @Req() req: RequestWithUser,
    @Body() body: UpdateMeDto, // Các field text vẫn vào đây
    @UploadedFile() file?: Express.Multer.File, // File ảnh vào đây
  ): AuthResponse {
    const userId = req.user.id;
    const data = await this.authService.updateMe(userId, body, file);

    return {
      data: data,
      message: 'Updated successfully!',
      success: true,
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Req() req: RequestWithUser,
    @Body() body: ChangePasswordDto,
  ): AuthResponse {
    const user = req.user;
    await this.authService.changePassword(user.id, user.email, body);

    return {
      data: null,
      message: 'Changed password successfully!',
      success: true,
      statusCode: HttpStatus.OK,
    };
  }

  @Post('refresh-token')
  async refreshToken(
    @Res({ passthrough: true }) res: Response, //Dùng passthrough để vẫn return được object,
    @Req() req: Request,
  ): AuthResponse {
    const refreshTokenCookie = req.cookies.refreshToken as string;
    if (!refreshTokenCookie) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const { accessToken, refreshToken } =
      await this.authService.refreshToken(refreshTokenCookie);

    this.saveTokenCookie(res, accessToken, refreshToken);

    return {
      data: { accessToken },
      message: 'Refresh token successfully!',
      success: true,
      statusCode: HttpStatus.OK,
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto): AuthResponse {
    await this.authService.forgotPassword(body);

    return {
      data: null,
      message:
        'A password recovery request has been sent to your email address.',
      success: true,
      statusCode: HttpStatus.OK,
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto): AuthResponse {
    await this.authService.resetPassword(body);

    return {
      data: null,
      message: 'Reset password successfully!',
      success: true,
      statusCode: HttpStatus.OK,
    };
  }
}
