import { CookieOptions } from 'express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException } from '@nestjs/common';
import { envConfig } from '../config/env.configuration';

export const PARAMS = {
  PAGE: 1,
  LIMIT: 10,
  SEARCH: '',
};

export const COOKIE_DEFAULT_OPTIONS: CookieOptions = {
  // Đây là lá chắn quan trọng nhất chống lại XSS (Cross-Site Scripting).
  // Khi bật cái này, trình duyệt sẽ cấm mọi mã JavaScript (document.cookie)
  // truy cập vào cookie. Hacker không thể dùng script lậu để đánh cắp Token.
  httpOnly: true,
  // Cookie chỉ được gửi đi thông qua kết nối mã hóa HTTPS. Nếu bạn dùng HTTP thường,
  // trình duyệt sẽ không gửi cookie này. (Ở local ta để false để dev cho dễ,
  // nên mới có check process.env.NODE_ENV).
  secure: envConfig().isProduction,
  // Ngăn chặn tấn công CSRF (Cross-Site Request Forgery). Nó đảm bảo trình duyệt chỉ
  // gửi cookie này nếu yêu cầu bắt nguồn từ chính domain của bạn.
  // Nếu user nhấn vào một link lạ từ website khác, cookie sẽ không bị gửi kèm theo.
  sameSite: envConfig().isProduction ? 'none' : 'lax',
  // Thời gian sống của cookie tính bằng mili giây. Hết thời gian này, trình duyệt tự
  // động xóa sạch dấu vết.
  // maxAge: 24 * 60 * 60 * 1000, // Mặc định 1 ngày
};

export const MULTER_IMAGE_OPTIONS: MulterOptions = {
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      return callback(
        new BadRequestException('Chỉ chấp nhận file ảnh!'),
        false,
      );
    }
    callback(null, true);
  },
};
