import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfigProps } from '../env.configuration';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule], // 1. Mở cửa cho ConfigModule vào
      inject: [ConfigService], // 2. Chỉ định rõ: "Tôi cần ConfigService ở đây",
      useFactory: (config: ConfigService<EnvConfigProps>) => ({
        type: 'single',
        url: config.get(`redis.url`, { infer: true }),
      }),
    }),
  ],
})
export class RedisConfigModule {}
