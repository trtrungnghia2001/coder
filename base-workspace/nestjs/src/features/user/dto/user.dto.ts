import { PARAMS } from '@app/common/constants';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không đúng định dạng!' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'Username không được để trống' })
  @MinLength(2, { message: 'Username phải có ít nhất 2 ký tự' })
  username!: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'Username phải có ít nhất 2 ký tự' })
  username?: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @Type(() => Date)
  @IsDate({ message: 'Ngày sinh không hợp lệ' })
  @IsOptional()
  birthday?: Date;
}

export class UserQuery {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = PARAMS.PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = PARAMS.LIMIT;

  @IsOptional()
  @IsString()
  search: string = PARAMS.SEARCH;
}
