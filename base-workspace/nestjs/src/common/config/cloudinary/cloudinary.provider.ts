import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { EnvConfigProps } from '../env.configuration';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  inject: [ConfigService],
  useFactory: (configService: ConfigService<EnvConfigProps>) => {
    return cloudinary.config({
      cloud_name: configService.get('cloudinary.cloudName', { infer: true }),
      api_key: configService.get('cloudinary.apiKey', { infer: true }),
      api_secret: configService.get('cloudinary.apiSecret', { infer: true }),
    });
  },
};
