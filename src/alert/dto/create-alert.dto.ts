import { ApiProperty } from '@nestjs/swagger';
import { AlertType, AlertLevel } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlertDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty()
  @IsEnum(AlertType)
  @IsNotEmpty()
  type: AlertType;
  @ApiProperty()
  @IsEnum(AlertLevel)
  @IsNotEmpty()
  level: AlertLevel;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  latitude?: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  longitude?: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  occurrenceId?: string;
}
