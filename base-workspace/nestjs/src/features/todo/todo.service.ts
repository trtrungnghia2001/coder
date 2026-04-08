import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto, TodoQuery, UpdateTodoDto } from './dto/todo.dto';
import { ILike, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { TodoPriority, TodoStatus } from './constant';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  async seedData() {
    // Xóa dữ liệu cũ nếu muốn làm sạch DB trước khi seed (Tùy chọn)
    // await this.todoRepo.clear();

    const todos: Todo[] = [];

    for (let i = 0; i < 60; i++) {
      const todo = this.todoRepo.create({
        title: faker.lorem.sentence({ min: 3, max: 8 }),
        description: faker.lorem.paragraph(),
        status: faker.helpers.enumValue(TodoStatus),
        priority: faker.helpers.enumValue(TodoPriority),
        dueDate: faker.date.future(),
      });
      todos.push(todo);
    }

    await this.todoRepo.save(todos);
    return { message: 'Đã nạp thành công 60 bản ghi mẫu!' };
  }

  async create(dto: CreateTodoDto) {
    const newTodo = this.todoRepo.create(dto);

    return await this.todoRepo.save(newTodo);
  }

  async updateOne(id: string, dto: UpdateTodoDto) {
    const data = await this.findOne(id);

    const updatedTodo = this.todoRepo.merge(data, dto);

    return await this.todoRepo.save(updatedTodo);
  }

  async deleteOne(id: string) {
    const data = await this.findOne(id);

    await this.todoRepo.delete({ id });

    return data;
  }

  async findAll(query: TodoQuery) {
    const { page, limit, search, status, priority } = query;
    const skip = (page - 1) * limit;
    const [data, totalItems] = await this.todoRepo.findAndCount({
      where: {
        title: search ? ILike(`%${search}%`) : undefined,
        status: status,
        priority: priority,
      },
      order: { createdAt: 'DESC' }, // Sắp xếp mới nhất lên đầu
      take: limit, // Tương đương LIMIT
      skip: skip, // Tương đương OFFSET
    });

    return {
      data,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        limit,
        page,
      },
    };
  }

  async findOne(id: string) {
    const data = await this.todoRepo.findOneBy({ id });

    if (!data) throw new NotFoundException(`Todo with ID ${id} not found`);

    return data;
  }
}
