import { Injectable } from '@nestjs/common';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OccurrenceService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOccurrenceDto: CreateOccurrenceDto) {
    return this.prisma.occurrence.create({
      data: createOccurrenceDto,
    });
  }

  findAll() {
    return this.prisma.occurrence.findMany();
  }

  findOne(id: string) {
    return this.prisma.occurrence.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateOccurrenceDto: UpdateOccurrenceDto) {
    return this.prisma.occurrence.update({
      where: {
        id: id,
      },
      data: updateOccurrenceDto,
    });
  }

  remove(id: string) {
    return this.prisma.occurrence.delete({
      where: {
        id: id,
      },
    });
  }
}
