import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      throw new InternalServerErrorException(
        'Failed to create location.',
        error.message,
      );
    }
  }

  async findAll(): Promise<Location[]> {
    try {
      return await this.prisma.location.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch locations.',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Location> {
    try {
      const location = await this.prisma.location.findUnique({
        where: { id },
      });

      if (!location) {
        throw new NotFoundException(`Location with ID ${id} not found.`);
      }

      return location;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch location.',
        error.message,
      );
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
      throw new InternalServerErrorException(
        'Failed to update location.',
        error.message,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.location.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete location.',
        error.message,
      );
    }
  }
}
