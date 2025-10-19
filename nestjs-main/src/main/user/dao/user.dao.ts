import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserRequest } from "../request/user.request"
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserDao {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async findAll(search?: string, limit = 10, offset = 0) {
    const qb = this.repository.createQueryBuilder('user');
    if (search) qb.where('firstName LIKE :search', { search: `%${search}%` });

    const [users, count] = await qb.take(limit).skip(offset).orderBy('created_date').getManyAndCount();
    const userList = plainToInstance(UserDto, users);

    return { userList, count, limit, offset };
  }

  async findOne(id: number) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return plainToInstance(UserDto, user);
  }

  async create(body: UserRequest) {
    const user = this.repository.create(body);
    const created = await this.repository.save(user);
    return plainToInstance(UserDto, created);
  }

  async update(id: number, body: UserRequest) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, body);
    const updated = await this.repository.save(user);
    return plainToInstance(UserDto, updated);
  }

  async delete(id: number) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.repository.delete(id);
  }
}
