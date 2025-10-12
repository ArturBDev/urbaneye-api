import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLocationDto: CreateLocationDto) {
    return this.prisma.location.create({
      data: createLocationDto,
    });
  }

  findAll() {
    return this.prisma.location.findMany();
  }

  findOne(id: string) {
    return this.prisma.location.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.prisma.location.update({
      where: {
        id: id,
      },
      data: updateLocationDto,
    });
  }

  remove(id: string) {
    return this.prisma.location.delete({
      where: {
        id: id,
      },
    });
  }
}
