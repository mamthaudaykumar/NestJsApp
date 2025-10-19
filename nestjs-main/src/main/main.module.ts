import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { Product } from './product/entity/product.entity';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product]),
  UserModule,
  ProductModule,]
})
export class MainModule {
}
