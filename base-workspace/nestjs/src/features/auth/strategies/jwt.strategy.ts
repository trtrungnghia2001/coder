import { EnvConfigProps } from '@app/common/config/env.configuration';
import { AuthenticatedUser, JwtPayloadData } from '@app/common/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { type Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // 'jwt' là tên mặc định
  constructor(private readonly configService: ConfigService<EnvConfigProps>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1. Ưu tiên lấy từ Header (cho Mobile hoặc Postman)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // 2. Lấy từ Cookie (cho Website - an toàn XSS)
        (request: Request) => {
          return request?.cookies?.accessToken as string;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret', { infer: true })!,
    });
  }

  // Payload này là dữ liệu sau khi giải mã Token thành công
  validate(payload: JwtPayloadData): AuthenticatedUser {
    return { id: payload.sub, role: payload.role, email: payload.email };
  }
}
