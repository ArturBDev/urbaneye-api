import { OccurrenceStatus, OccurrenceType } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class OccurrenceFiltersDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  latitude?: number;
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  longitude?: number;
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  radius?: number;
  @IsEnum(OccurrenceType)
  @IsOptional()
  type?: OccurrenceType;
  @IsEnum(OccurrenceStatus)
  @IsOptional()
  status?: OccurrenceStatus;
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}
