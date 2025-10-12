import { UserRole } from '@prisma/client';

export class CreateUserDto {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
