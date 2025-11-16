import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
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
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  zipCode: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  state: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  neighborhood: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  street: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  number: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  complement?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  reference?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  profilePicture?: string;
}
