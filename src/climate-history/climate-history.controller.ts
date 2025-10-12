import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClimateHistoryService } from './climate-history.service';
import { CreateClimateHistoryDto } from './dto/create-climate-history.dto';
import { UpdateClimateHistoryDto } from './dto/update-climate-history.dto';

@Controller('climate-history')
export class ClimateHistoryController {
  constructor(private readonly climateHistoryService: ClimateHistoryService) {}

  @Post()
  create(@Body() createClimateHistoryDto: CreateClimateHistoryDto) {
    return this.climateHistoryService.create(createClimateHistoryDto);
  }

  @Get()
  findAll() {
    return this.climateHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climateHistoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClimateHistoryDto: UpdateClimateHistoryDto,
  ) {
    return this.climateHistoryService.update(id, updateClimateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climateHistoryService.remove(id);
  }
}
