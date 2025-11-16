import { ApiProperty } from '@nestjs/swagger';
import { OccurrenceStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOccurrenceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  latitude: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  longitude: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  locationId: string;
  @IsEnum(OccurrenceStatus)
  @IsNotEmpty()
  @ApiProperty()
  status: OccurrenceStatus;
  @IsString()
  @IsOptional()
  @ApiProperty()
  imageUrl?: string;
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
}
