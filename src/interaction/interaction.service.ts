import { Injectable } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InteractionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createInteractionDto: CreateInteractionDto) {
    return this.prisma.interaction.create({
      data: createInteractionDto,
    });
  }

  findAll() {
    return this.prisma.interaction.findMany();
  }

  findOne(id: string) {
    return this.prisma.interaction.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateInteractionDto: UpdateInteractionDto) {
    return this.prisma.interaction.update({
      where: {
        id: id,
      },
      data: updateInteractionDto,
    });
  }

  remove(id: string) {
    return this.prisma.interaction.delete({
      where: {
        id: id,
      },
    });
  }
}
