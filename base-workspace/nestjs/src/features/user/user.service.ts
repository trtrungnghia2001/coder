import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserQuery } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password') // Lấy thêm cột đã bị ẩn (select: false)
      .getOne();
  }

  async create(dto: CreateUserDto) {
    const newUser = this.userRepo.create(dto);
    return await this.userRepo.save(newUser);
  }

  async updateOne(id: string, dto: UpdateUserDto) {
    const data = await this.findOne(id);

    const updatedTodo = this.userRepo.merge(data, dto);

    return await this.userRepo.save(updatedTodo);
  }

  async deleteOne(id: string) {
    const data = await this.findOne(id);

    await this.userRepo.delete({ id });

    return data;
  }

  async findOne(id: string) {
    const data = await this.userRepo.findOneBy({ id });

    if (!data) throw new NotFoundException(`User with ID ${id} not found`);

    return data;
  }

  async findAll(query: UserQuery) {
    const { page, limit, search } = query;
    const skip = (page - 1) * limit;
    const [data, totalItems] = await this.userRepo.findAndCount({
      where: search
        ? [{ email: ILike(`%${search}%`) }, { username: ILike(`%${search}%`) }]
        : {},
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
}
