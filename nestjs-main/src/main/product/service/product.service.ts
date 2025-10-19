import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductDao } from '../dao/product.dao';
import { ProductRequest } from '../request/product.request';
import { ProductDto } from '../dto/product.dto';
import { PageDtoProduct } from '../dto/pagedProduct.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productDao: ProductDao) {}

  async findAll(search?: string, limit = 10, offset = 0) {
    const [products, count] = await this.productDao.findAll(search, limit, offset);

    const dtos = products.map(
      (product) =>
        ({
          id: product.id,
          userId: product.userId,
          number: product.number,
          title: product.title,
          description: product.description,
        } as ProductDto),
    );

    return new PageDtoProduct(dtos, count, limit, offset);
  }

  async findById(productId: string) {
    const product = await this.productDao.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    return {
      id: product.id,
      userId: product.userId,
      number: product.number,
      title: product.title,
      description: product.description,
    };
  }

  async create(body: ProductRequest) {
    const created = await this.productDao.create(body);

    return {
      id: created.id,
      userId: created.userId,
      number: created.number,
      title: created.title,
      description: created.description,
    };
  }

  async update(productId: string, body: ProductRequest) {
    const product = await this.productDao.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    if (product.userId !== body.userId) {
      throw new ForbiddenException('You do not have access to this product');
    }

    Object.assign(product, body);
    const updated = await this.productDao.update(product);

    return {
      id: updated.id,
      userId: updated.userId,
      number: updated.number,
      title: updated.title,
      description: updated.description,
    };
  }

  async delete(productId: string) {
    const product = await this.productDao.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    await this.productDao.delete(productId);
  }
}
