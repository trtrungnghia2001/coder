import { ROLES } from '@app/features/user/constant';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { AuthenticatedUser } from '@app/common/types';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  // Reflector: Một helper của NestJS dùng để "soi" Metadata mà ta đã đặt bằng @Roles.
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Lấy danh sách các Role yêu cầu từ Metadata.
    // getAllAndOverride: Ưu tiên lấy Metadata ở cấp Method (hàm), nếu không có mới lấy ở cấp Class (Controller).
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
      context.getHandler(), // Soi ở hàm (ví dụ: update)
      context.getClass(), // Soi ở class (ví dụ: UserController)
    ]);

    // 2. Nếu Route này không cắm nhãn @Roles -> Nghĩa là ai cũng vào được (sau khi đã qua JwtAuthGuard).
    if (!requiredRoles) {
      return true;
    }

    // 3. Lấy thông tin user từ Request.
    // LƯU Ý: Phải chạy JwtAuthGuard trước thì req.user mới tồn tại.
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: AuthenticatedUser }>();
    const user = request.user;

    // 4. Kiểm tra xem quyền của User có nằm trong danh sách quyền được phép không.
    if (!user) {
      return false;
    }
    const hasRole = requiredRoles.some((role) => user.role === role);

    // 5. Nếu không có quyền -> Ném lỗi 403 Forbidden.
    // Tại sao dùng Forbidden? Vì User đã Login (Authenticated) nhưng không đủ thẩm quyền (Authorized).
    if (!hasRole) {
      throw new ForbiddenException('You are not allowed to do this!');
    }

    return true;
  }
}
