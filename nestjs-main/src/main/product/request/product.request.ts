import { ApiProperty } from '@nestjs/swagger';

export class ProductRequest {
  @ApiProperty({ description: 'ID of the user creating the product' })
  userId: number;

  @ApiProperty({ description: 'Product number or code' })
  number: string;

  @ApiProperty({ description: 'Title of the product' })
  title: string;

  @ApiProperty({ description: 'Detailed description of the product' })
  description: string;
}
