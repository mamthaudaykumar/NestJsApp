import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../util/enums/user-role';

export class UserDto {
  @ApiProperty({ description: 'User ID', example: '1' })
  id: string;

  @ApiProperty({ description: 'First name', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  lastName: string;

  @ApiProperty({ description: 'Email of the user', example: 'john@example.com' })
  email: string;

  @ApiProperty({ description: 'Role of the user', enum: UserRole, example: UserRole.ADMIN })
  role: UserRole;
}
