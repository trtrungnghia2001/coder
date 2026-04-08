import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, TodoQuery, UpdateTodoDto } from './dto/todo.dto';
import { ApiResponse } from '@app/common/types';
import { Todo } from './todo.entity';

type TodoResponse = Promise<ApiResponse<Todo | Todo[]>>;

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('seed')
  async seed() {
    return await this.todoService.seedData();
  }

  @Post('')
  async create(@Body() body: CreateTodoDto): TodoResponse {
    const data = await this.todoService.create(body);
    return {
      data,
      message: 'Created successfully!',
      statusCode: HttpStatus.CREATED,
      success: true,
    };
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateTodoDto,
  ): TodoResponse {
    const data = await this.todoService.updateOne(id, body);
    return {
      data,
      message: 'Updated successfully!',
      statusCode: HttpStatus.OK,
      success: true,
    };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): TodoResponse {
    const data = await this.todoService.deleteOne(id);
    return {
      data,
      message: 'Deleted successfully!',
      statusCode: HttpStatus.OK,
      success: true,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): TodoResponse {
    const data = await this.todoService.findOne(id);
    return {
      data,
      message: 'Find successfully!',
      statusCode: HttpStatus.OK,
      success: true,
    };
  }

  @Get()
  async findAll(@Query() query: TodoQuery): TodoResponse {
    const { data, pagination } = await this.todoService.findAll(query);
    return {
      data,
      message: 'Find successfully!',
      statusCode: HttpStatus.OK,
      success: true,
      pagination,
    };
  }
}
