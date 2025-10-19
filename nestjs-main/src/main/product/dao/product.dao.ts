import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { ProductRequest } from '../request/product.request';

@Injectable()
export class ProductDao {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findAll(search?: string, limit = 10, offset = 0) {
    const qb = this.repository.createQueryBuilder('product');
    if (search) {
      qb.where('product.title LIKE :search', { search: `%${search}%` });
    }
    return qb.take(limit).skip(offset).orderBy('created_date').getManyAndCount();
  }

  async findById(productId: string) {
    return this.repository
      .createQueryBuilder('product')
      .where('product.id = :id', { id: productId })
      .getOne();
  }

  async create(data: ProductRequest) {
    const product = this.repository.create(data);
    return this.repository.save(product);
  }

  async update(product: Product) {
    return this.repository.save(product);
  }

  async delete(productId: string) {
    return this.repository.delete(productId);
  }
}
