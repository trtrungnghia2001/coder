import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TodoPriority, TodoStatus } from '../constant';
import { PARAMS } from '@app/common/constants';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTodoDto {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TodoStatus)
  status!: TodoStatus;

  @IsEnum(TodoPriority)
  priority!: TodoPriority;

  @Type(() => Date)
  @IsDate()
  dueDate!: Date;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}

export class TodoQuery {
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

  @IsOptional()
  @IsEnum(TodoStatus, {
    message: 'Status phải là pending, in-progress hoặc completed',
  })
  status?: TodoStatus;

  @IsOptional()
  @IsEnum(TodoPriority, {
    message: 'Priority phải là low, medium hoặc high',
  })
  priority?: TodoPriority;
}
