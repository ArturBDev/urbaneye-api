import { UserRole, UserType } from '@prisma/client';

export class User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  type: UserType;
  role: UserRole;
  createdAt: Date;
  phoneNumber: string;
  zipCode: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  reference: string;
  profilePicture: string;
}
