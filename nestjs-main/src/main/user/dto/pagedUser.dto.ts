import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class PageDtoUser {
  constructor(items: UserDto[], total: number, limit: number, offset: number) {
    this.items = items;
    this.total = total;
    this.limit = limit;
    this.offset = offset;
  }

  @ApiProperty({ type: [UserDto], description: 'List of users on this page' })
  items: UserDto[];

  @ApiProperty({ description: 'Total number of users' })
  total: number;

  @ApiProperty({ description: 'Limit per page', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Offset', example: 0 })
  offset: number;
}
