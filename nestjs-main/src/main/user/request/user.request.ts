import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../util/enums/user-role';

export class UserRequest {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  lastName: string;

  @ApiProperty({ 
    description: 'Role of the user', 
    enum: UserRole, 
    example: UserRole.ADMIN 
  })
  role: UserRole;
}
