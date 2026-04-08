import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfig } from './common/config/env.configuration';
import { TodoModule } from './features/todo/todo.module';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { CloudinaryModule } from './common/config/cloudinary/cloudinary.module';
import { AdminModule } from './features/admin/admin.module';
import { MailConfigModule } from './common/config/mail/mail.module';
import { RedisConfigModule } from './common/config/redis/redis.module';
import { MysqlConfigModule } from './common/config/database/mysql.module';
import { LoggerMiddleware } from './common/config/logger/logger.middleware';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      load: [envConfig], // Nạp "công thức" của bạn vào đây
      isGlobal: true, // Để có thể dùng ConfigService ở mọi nơi
    }),
    MysqlConfigModule,
    CloudinaryModule,
    MailConfigModule,
    RedisConfigModule,

    // features
    AuthModule,
    TodoModule,
    UserModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Log tất cả mọi nẻo đường
  }
}
