import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigProps } from '../env.configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 1. Phải import ConfigModule ở đây
      inject: [ConfigService], // 2. Phải inject ConfigService ở đây
      useFactory: (configService: ConfigService<EnvConfigProps>) => ({
        type: 'mysql',
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Danh sách các thực thể (bảng)
        autoLoadEntities: true, // Tự động nạp các Entity đã khai báo trong TypeOrmModule.forFeature()
        synchronize: true, // Tự động tạo bảng (chỉ dùng khi Dev, không dùng cho Prod)
        host: configService.get('database.host', { infer: true }),
        port: configService.get('database.port', { infer: true }),
        username: configService.get('database.username', { infer: true }),
        password: configService.get('database.password', { infer: true }),
        database: configService.get('database.database', { infer: true }),
      }),
    }),
  ],
})
export class MysqlConfigModule {}
