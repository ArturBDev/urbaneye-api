import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  passwordHash: string;
  @ApiProperty()
  role: UserRole;
  @ApiProperty()
  createdAt: Date;
}
