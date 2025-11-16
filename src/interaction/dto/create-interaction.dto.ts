import { InteractionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateInteractionDto {
  @IsEnum(InteractionType)
  @IsNotEmpty()
  type: InteractionType;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  occurrenceId: string;
}
