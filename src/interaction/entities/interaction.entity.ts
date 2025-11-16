import { InteractionType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class Interaction {
  @ApiProperty()
  @IsEnum(InteractionType)
  @IsNotEmpty()
  type: InteractionType;
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  occurrenceId: string;
}
