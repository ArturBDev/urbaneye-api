import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Location } from './entities/location.entity';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    try {
      return await this.prisma.location.create({
        data: createLocationDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Location[]> {
    try {
      return await this.prisma.location.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Location> {
    try {
      return await this.prisma.location.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    try {
      return await this.prisma.location.update({
        where: { id },
        data: updateLocationDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.location.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
