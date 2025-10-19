import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductController } from './controller/product.controller';
import { PublicProductController } from './controller/public-product.controller';
import { ProductService } from './service/product.service';
import { ProductDao } from './dao/product.dao';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductDao],
  controllers: [ProductController, PublicProductController],
  exports: [ProductService],
})
export class ProductModule {}
