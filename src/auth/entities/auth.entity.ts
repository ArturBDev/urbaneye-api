//src/auth/entities/auth.entity.ts
import { UserRole, UserType } from '@prisma/client';

export class AuthEntity {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    type: UserType;
    role: UserRole;
    createdAt: Date;
    phoneNumber: string;
    zipCode: string;
    profilePicture: string;
  };
}
