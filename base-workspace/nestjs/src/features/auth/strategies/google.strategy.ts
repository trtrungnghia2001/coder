import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfigProps } from '@app/common/config/env.configuration';
import { UserService } from '@app/features/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService<EnvConfigProps>,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('google.clientID', { infer: true }) || '',
      clientSecret:
        configService.get('google.clientSecret', { infer: true }) || '',
      callbackURL:
        configService.get('google.callbackURL', { infer: true }) ||
        'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
      // Thêm dòng này nếu TS vẫn báo lỗi passReqToCallback
      passReqToCallback: false,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    // const { name, emails, photos } = profile;
    console.log({ profile });

    const user = {
      // email: emails[0].value,
      // firstName: name.givenName,
      // lastName: name.familyName,
      // picture: photos[0].value,
      // accessToken,
    };
    done(null, user);
  }
}
