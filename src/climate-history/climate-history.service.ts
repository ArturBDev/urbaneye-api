import { Injectable } from '@nestjs/common';
import { CreateClimateHistoryDto } from './dto/create-climate-history.dto';
import { UpdateClimateHistoryDto } from './dto/update-climate-history.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClimateHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClimateHistoryDto: CreateClimateHistoryDto) {
    return this.prisma.climateHistory.create({
      data: createClimateHistoryDto,
    });
  }

  findAll() {
    return this.prisma.climateHistory.findMany();
  }

  findOne(id: string) {
    return this.prisma.climateHistory.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateClimateHistoryDto: UpdateClimateHistoryDto) {
    return this.prisma.climateHistory.update({
      where: {
        id: id,
      },
      data: updateClimateHistoryDto,
    });
  }

  remove(id: string) {
    return this.prisma.climateHistory.delete({
      where: {
        id: id,
      },
    });
  }
}
