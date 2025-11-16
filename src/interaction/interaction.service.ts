import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Interaction } from './entities/interaction.entity';

@Injectable()
export class InteractionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Interaction[]> {
    try {
      return await this.prisma.interaction.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch interactions.',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Interaction> {
    try {
      return await this.prisma.interaction.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch interaction.',
        error.message,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.interaction.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete interaction.',
        error.message,
      );
    }
  }
}
