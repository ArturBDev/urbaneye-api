import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFeedbackDto: CreateFeedbackDto) {
    return this.prisma.feedback.create({
      data: createFeedbackDto,
    });
  }

  findAll() {
    return this.prisma.feedback.findMany();
  }

  findOne(id: string) {
    return this.prisma.feedback.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    return this.prisma.feedback.update({
      where: {
        id: id,
      },
      data: updateFeedbackDto,
    });
  }

  remove(id: string) {
    return this.prisma.feedback.delete({
      where: {
        id: id,
      },
    });
  }
}
