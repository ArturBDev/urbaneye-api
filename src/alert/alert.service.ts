import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Alert } from './entities/alert.entity';

@Injectable()
export class AlertService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlertDto: CreateAlertDto): Promise<Alert> {
    try {
      return await this.prisma.alert.create({
        data: createAlertDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create alert.',
        error.message,
      );
    }
  }

  async findAll(): Promise<Alert[]> {
    try {
      return await this.prisma.alert.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch alerts.',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Alert> {
    try {
      return await this.prisma.alert.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch alert.',
        error.message,
      );
    }
  }

  async update(id: string, updateAlertDto: UpdateAlertDto): Promise<Alert> {
    try {
      return await this.prisma.alert.update({
        where: {
          id: id,
        },
        data: updateAlertDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update alert.',
        error.message,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.alert.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete alert.',
        error.message,
      );
    }
  }
}
