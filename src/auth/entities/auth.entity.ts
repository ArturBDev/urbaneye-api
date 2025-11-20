//src/auth/entities/auth.entity.ts
import { User } from '@prisma/client';

export class AuthEntity {
  accessToken: string;
  user: User;
}
