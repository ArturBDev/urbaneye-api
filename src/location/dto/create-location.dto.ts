import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  neighborhood?: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsNotEmpty()
  state: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsNotEmpty()
  latitude: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsNotEmpty()
  longitude: number;
}
