import { OccurrenceStatus, OccurrenceType } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class OccurrenceFiltersDto {
  @IsNumber()
  @IsOptional()
  latitude?: number;
  @IsNumber()
  @IsOptional()
  longitude?: number;
  @IsNumber()
  @IsOptional()
  radius?: number;
  @IsEnum(OccurrenceType)
  @IsOptional()
  type?: OccurrenceType;
  @IsEnum(OccurrenceStatus)
  @IsOptional()
  status?: OccurrenceStatus;
  @IsDate()
  @IsOptional()
  startDate?: Date;
  @IsDate()
  @IsOptional()
  endDate?: Date;
}
