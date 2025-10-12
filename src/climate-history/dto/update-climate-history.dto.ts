import { PartialType } from '@nestjs/swagger';
import { CreateClimateHistoryDto } from './create-climate-history.dto';

export class UpdateClimateHistoryDto extends PartialType(CreateClimateHistoryDto) {}
