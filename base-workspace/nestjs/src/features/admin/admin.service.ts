import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserQuery } from '../user/dto/user.dto';
import { TodoService } from '../todo/todo.service';
import { TodoQuery } from '../todo/dto/todo.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly todoService: TodoService,
  ) {}

  async findAllUser(query: UserQuery) {
    return await this.userService.findAll(query);
  }
  async findAllTodo(query: TodoQuery) {
    return await this.todoService.findAll(query);
  }
}
