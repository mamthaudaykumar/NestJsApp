import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../user/controller/user.contoller';
import { User } from './entity/user.entity';
import { UserDao } from './dao/user.dao';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserDao],
  exports: [UserService, UserDao],
})
export class UserModule {}
