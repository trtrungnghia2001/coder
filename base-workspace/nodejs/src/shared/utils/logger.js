import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Định nghĩa định dạng Log (Format)
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) =>
      `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`,
  ),
);

export const logger = winston.createLogger({
  format: logFormat,
  transports: [
    // 1. Ghi log ra Terminal (Console)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Thêm màu cho các level (Error: đỏ, Info: xanh...)
        logFormat,
      ),
    }),

    // 2. Ghi các lỗi (Error) vào một file riêng
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),

    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
    }),
  ],
});

export const requestLogger = (req, res, next) => {
  const start = Date.now(); // 🕒 Ghi lại thời điểm request vừa chạm vào server

  // Lắng nghe sự kiện 'finish' - khi toàn bộ dữ liệu đã được gửi về cho Client
  res.on('finish', () => {
    const duration = Date.now() - start; // ⏱ Tính thời gian xử lý
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;

    const logMessage = `${method} ${originalUrl} ${statusCode} - ${duration}ms - IP: ${ip}`;

    // Phân loại Log theo mã trạng thái (Status Code)
    if (statusCode >= 500) {
      logger.error(`[SERVER_ERROR] ${logMessage}`);
    } else if (statusCode >= 400) {
      logger.warn(`[CLIENT_ERROR] ${logMessage}`);
    } else {
      logger.info(`[SUCCESS] ${logMessage}`);
    }
  });

  next(); // Bắt buộc phải có cái này để request đi tiếp vào Controller
};
