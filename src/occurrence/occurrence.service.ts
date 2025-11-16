import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Occurrence } from './entities/occurrence.entity';

@Injectable()
export class OccurrenceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOccurrenceDto: CreateOccurrenceDto): Promise<Occurrence> {
    try {
      return await this.prisma.occurrence.create({
        data: createOccurrenceDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create occurrence.',
        error.message,
      );
    }
  }

  async findAll(): Promise<Occurrence[]> {
    try {
      return await this.prisma.occurrence.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch occurrences.',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Occurrence> {
    try {
      return await this.prisma.occurrence.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch occurrence.',
        error.message,
      );
    }
  }

  async update(
    id: string,
    updateOccurrenceDto: UpdateOccurrenceDto,
  ): Promise<Occurrence> {
    try {
      return await this.prisma.occurrence.update({
        where: {
          id: id,
        },
        data: updateOccurrenceDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update occurrence.',
        error.message,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.occurrence.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete occurrence.',
        error.message,
      );
    }
  }
}
