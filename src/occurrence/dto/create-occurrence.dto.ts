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
}
