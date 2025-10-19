import { Injectable } from '@nestjs/common';
import { UserDao } from '../dao/user.dao';
import { UserDto } from '../dto/user.dto';
import { PageDto } from '../../dto/page.dto';
import { UserRequest } from '../request/user.request';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async findAll(search?: string, limit = 10, offset = 0) {
    const { userList, count } = await this.userDao.findAll(search, limit, offset);
    const dtos = plainToInstance(UserDto, userList);
    return new PageDto<UserDto>(dtos, count, limit, offset);
  }

  async findOne(id: number) {
    const user = await this.userDao.findOne(id);
    return plainToInstance(UserDto, user);
  }

  async create(body: UserRequest) {
    const user = await this.userDao.create(body);
    return plainToInstance(UserDto, user);
  }

  async update(id: number, body: UserRequest) {
    const user = await this.userDao.update(id, body);
    return plainToInstance(UserDto, user);
  }

  async delete(id: number) {
    return this.userDao.delete(id);
  }
}
