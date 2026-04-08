import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Định nghĩa format cho Log: [Thời gian] [Level]: [Nội dung]
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`,
  ),
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    // 1. In ra màn hình console để mình xem lúc code
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Thêm màu sắc cho dễ nhìn
        logFormat,
      ),
    }),

    // 2. Ghi lỗi vào file riêng (Hộp thư đỏ)
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error', // Chỉ ghi những cái từ 'error' trở lên
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // Giữ 14 ngày
    }),

    // 3. Ghi tất cả log vào file này (Hộp thư tổng)
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d', // Giữ 30 ngày
    }),
  ],
});

export default logger;
