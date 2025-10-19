import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class PageDtoProduct {
  constructor(items: ProductDto[], total: number, limit: number, offset: number) {
    this.items = items;
    this.total = total;
    this.limit = limit;
    this.offset = offset;
  }

  @ApiProperty({ type: [ProductDto], description: 'List of products on this page' })
  items: ProductDto[];

  @ApiProperty({ description: 'Total number of products' })
  total: number;

  @ApiProperty({ description: 'Limit per page', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Offset', example: 0 })
  offset: number;
}
