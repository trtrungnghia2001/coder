import { Body, Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiResponse } from '@app/common/types';
import { User } from '../user/user.entity';
import { UserQuery } from '../user/dto/user.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLES } from '../user/constant';
import { Todo } from '../todo/todo.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // Middleware
@Roles(ROLES.ADMIN) // Cho biet can vao role nao
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async findAllUser(@Body() query: UserQuery): Promise<ApiResponse<User[]>> {
    const { data, pagination } = await this.adminService.findAllUser(query);
    return {
      data,
      message: 'Find successfully!',
      statusCode: HttpStatus.OK,
      success: true,
      pagination,
    };
  }

  @Get('todos')
  async findAllTodo(@Body() query: UserQuery): Promise<ApiResponse<Todo[]>> {
    const { data, pagination } = await this.adminService.findAllTodo(query);
    return {
      data,
      message: 'Find successfully!',
      statusCode: HttpStatus.OK,
      success: true,
      pagination,
    };
  }
}
