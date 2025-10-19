import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Product } from '../entity/product.entity';
import { ProductDto } from '../dto/product.dto';
import { PageDtoProduct } from '../dto/pagedProduct.dto';

@ApiTags('Product')
@Controller('product')
export class PublicProductController {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Public product search' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Paginated list of products', type: PageDtoProduct })
  async search(@Query() query: { search?: string; limit?: number; offset?: number }) {
    const { limit = 10, offset = 0, search } = query;
    const qb = this.repository.createQueryBuilder('product');
    if (search) qb.where('product.title LIKE :search', { search: `%${search}%` });

    const [products, count] = await qb.take(limit).skip(offset).orderBy('created_date').getManyAndCount();

    const dtos = products.map(p => ({
      id: p.id,
      userId: p.userId,
      number: p.number,
      title: p.title,
      description: p.description,
    }));

    return new PageDtoProduct(dtos, count, limit, offset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a public product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Product found', type: ProductDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async get(@Param('id') productId: string) {
    const product = await this.repository.createQueryBuilder('product').where('id = :id', { id: productId }).getOne();
    if (!product) throw new NotFoundException('Product not found');

    return {
      id: product.id,
      userId: product.userId,
      number: product.number,
      title: product.title,
      description: product.description,
    };
  }
}
