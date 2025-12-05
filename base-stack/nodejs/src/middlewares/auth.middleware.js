import envConfig from "#src/configs/env";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

// Middleware xác thực người dùng (authentication)
export const authMiddleware = async (req, res, next) => {
  try {
    // Thường là "Bearer <token>"
    const tokenHeader = req.headers.authorization;
    const tokenCookies = req.cookies.accessToken;

    let accessToken = null;

    if (tokenCookies) {
      // Ưu tiên lấy từ cookie nếu có
      accessToken = tokenCookies.split(" ")?.[1]; // Loại bỏ "Bearer "
    } else if (tokenHeader) {
      // Lấy từ Authorization header nếu không có trong cookie
      accessToken = tokenHeader.split(" ")?.[1]; // Loại bỏ "Bearer "
    }

    if (!accessToken) {
      throw createHttpError.Unauthorized(
        "Access Token not found. Please log in."
      );
    }

    // Xác minh token
    const decoded = await jwt.verify(accessToken, envConfig.JWT_SECRET_KEY);

    // Gán payload của token vào req.user để các controller sau có thể sử dụng
    req.user = decoded;
    next(); // Chuyển sang middleware/controller tiếp theo
  } catch (error) {
    next(error); // Chuyển các lỗi khác
  }
};

// Middleware kiểm tra quyền admin (authorization)
export const adminMiddleware = (req, res, next) => {
  const user = req.user;

  if (user && user.role === "admin") {
    next();
  } else {
    throw createHttpError.Forbidden("Forbidden: You don't have admin rights");
  }
};
