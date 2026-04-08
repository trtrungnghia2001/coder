import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfigProps } from '../env.configuration';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvConfigProps>) => ({
        transport: {
          host: config.get('mail.host', { infer: true }),
          port: config.get('mail.port', { infer: true }),
          secure: true,
          auth: {
            user: config.get('mail.user', { infer: true }),
            pass: config.get('mail.pass', { infer: true }),
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('mail.user', { infer: true })}>`,
        },
      }),
    }),
  ],
  exports: [MailerModule], // QUAN TRỌNG: Export để các module khác dùng được
})
export class MailConfigModule {}
