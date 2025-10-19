import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ description: 'Product ID', example: '1' })
  id: number;

  @ApiProperty({ description: 'User ID who created the product', example: '123' })
  userId: number;

  @ApiProperty({ description: 'Product number', example: 'P001' })
  number: string;

  @ApiProperty({ description: 'Product title', example: 'iPhone 15' })
  title: string;

  @ApiProperty({ description: 'Product description', example: 'Latest iPhone model' })
  description: string;
}
