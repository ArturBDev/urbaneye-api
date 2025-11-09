import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(1)
  @MaxLength(255)
  name: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  passwordHash: string;
  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty()
  role: UserRole;
}
