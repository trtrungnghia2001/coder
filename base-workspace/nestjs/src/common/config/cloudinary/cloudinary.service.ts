import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { EnvConfigProps } from '../env.configuration';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService<EnvConfigProps>) {}

  uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: this.configService.get('cloudinary.folder', { infer: true }), // Tên thư mục trên Cloudinary
          resource_type: 'auto',
        },
        (error, result) => {
          if (error)
            return reject(
              new Error(error.message || 'Cloudinary upload failed'),
            );
          if (!result) return reject(new Error('Upload result is undefined'));
          resolve(result);
        },
      );

      // Chuyển Buffer thành Stream bằng công cụ có sẵn của Node.js
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null); // Đánh dấu kết thúc stream

      stream.pipe(uploadStream);
    });
  }

  /**
   * Xóa file trên Cloudinary bằng public_id
   * @param publicId ID của file (ví dụ: 'avatars/abc123')
   */
  deleteFile(publicId: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        // 1. Kiểm tra lỗi kết nối/hệ thống
        if (error) {
          return reject(new Error(error.message || 'Cloudinary delete failed'));
        }

        // 2. Kiểm tra kết quả trả về từ Cloudinary
        if (result.result !== 'ok' && result.result !== 'not found') {
          return reject(
            new Error(`Cloudinary delete returned: ${result.result}`),
          );
        }

        // 3. CHỈ RESOLVE KHI MỌI THỨ ĐÃ XONG (Nằm trong callback)
        resolve(result);
      });
    });
  }
}
