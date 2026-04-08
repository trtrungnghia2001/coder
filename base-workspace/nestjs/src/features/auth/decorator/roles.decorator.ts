import { ROLES } from '@app/features/user/constant';
import { SetMetadata } from '@nestjs/common';

// ROLES_KEY: Định danh cái nhãn này trong hệ thống Metadata của NestJS.
// Giống như việc đặt tên cho một ngăn kéo để sau này Guard mở đúng ngăn đó ra lấy đồ.
export const ROLES_KEY = 'roles';

// Decorator @Roles:
// - Sử dụng SetMetadata để lưu trữ mảng các Role vào Metadata của Route/Controller.
// - Tại sao dùng (...roles): Để có thể truyền nhiều quyền, ví dụ @Roles(ROLES.ADMIN, ROLES.MODERATOR).
export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
