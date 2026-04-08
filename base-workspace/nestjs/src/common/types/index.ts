import { ROLES } from '@app/features/user/constant';
import { Request } from 'express';

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  pagination?: Pagination;
}

export interface JwtPayloadData {
  sub: string;
  email: string;
  role: ROLES;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: ROLES;
}

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}
