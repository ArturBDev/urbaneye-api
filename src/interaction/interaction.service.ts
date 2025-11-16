import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Interaction } from './entities/interaction.entity';

@Injectable()
export class InteractionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createInteractionDto: CreateInteractionDto,
  ): Promise<Interaction> {
    try {
      return await this.prisma.interaction.create({
        data: createInteractionDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Interaction[]> {
    try {
      return await this.prisma.interaction.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
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
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    updateInteractionDto: UpdateInteractionDto,
  ): Promise<Interaction> {
    try {
      return await this.prisma.interaction.update({
        where: {
          id: id,
        },
        data: updateInteractionDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
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
      throw new InternalServerErrorException(error);
    }
  }
}
