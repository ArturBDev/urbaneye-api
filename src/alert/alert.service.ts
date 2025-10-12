import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAlertDto: CreateAlertDto) {
    return this.prisma.alert.create({
      data: createAlertDto,
    });
  }

  findAll() {
    return this.prisma.alert.findMany();
  }

  findOne(id: string) {
    return this.prisma.alert.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateAlertDto: UpdateAlertDto) {
    return this.prisma.alert.update({
      where: {
        id: id,
      },
      data: updateAlertDto,
    });
  }

  remove(id: string) {
    return this.prisma.alert.delete({
      where: {
        id: id,
      },
    });
  }
}
