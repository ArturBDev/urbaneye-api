import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Occurrence } from './entities/occurrence.entity';
import { OccurrenceFiltersDto } from './dto/occurrence-filters.dto';
import { InteractionType, OccurrenceStatus } from '@prisma/client';

const LAST_HOUR = 1 * 60 * 60 * 1000;

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
      return await this.prisma.occurrence.findMany({
        where: {
          status: {
            in: [OccurrenceStatus.APPROVED, OccurrenceStatus.PENDING],
          },
        },
      });
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

  async getOccurrencesByUser(userId: string): Promise<Occurrence[]> {
    try {
      return await this.prisma.occurrence.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch occurrences by user.',
        error.message,
      );
    }
  }

  async getOccurrencesByLocation(
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<Occurrence[]> {
    try {
      return await this.prisma.occurrence.findMany({
        where: {
          latitude: {
            gte: radius ? latitude - radius : latitude,
            lte: radius ? latitude + radius : latitude,
          },
          longitude: {
            gte: radius ? longitude - radius : longitude,
            lte: radius ? longitude + radius : longitude,
          },
          status: {
            in: [OccurrenceStatus.APPROVED, OccurrenceStatus.PENDING],
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch occurrences by location.',
        error.message,
      );
    }
  }

  async getOccurrencesByFilters(
    occurrenceFiltersDto: OccurrenceFiltersDto,
  ): Promise<Occurrence[]> {
    try {
      return await this.prisma.occurrence.findMany({
        where: {
          latitude: occurrenceFiltersDto.latitude
            ? {
                gte: occurrenceFiltersDto.radius
                  ? occurrenceFiltersDto.latitude - occurrenceFiltersDto.radius
                  : occurrenceFiltersDto.latitude,
                lte: occurrenceFiltersDto.radius
                  ? occurrenceFiltersDto.latitude + occurrenceFiltersDto.radius
                  : occurrenceFiltersDto.latitude,
              }
            : undefined,
          longitude: occurrenceFiltersDto.longitude
            ? {
                gte: occurrenceFiltersDto.radius
                  ? occurrenceFiltersDto.longitude - occurrenceFiltersDto.radius
                  : occurrenceFiltersDto.longitude,
                lte: occurrenceFiltersDto.radius
                  ? occurrenceFiltersDto.longitude + occurrenceFiltersDto.radius
                  : occurrenceFiltersDto.longitude,
              }
            : undefined,
          occurrenceType: occurrenceFiltersDto.type
            ? occurrenceFiltersDto.type
            : undefined,
          status: occurrenceFiltersDto.status
            ? occurrenceFiltersDto.status
            : undefined,
          createdAt: occurrenceFiltersDto.startDate
            ? {
                gte: occurrenceFiltersDto.startDate,
                lte: occurrenceFiltersDto.endDate
                  ? occurrenceFiltersDto.endDate
                  : new Date(new Date().setDate(new Date().getDate() + 1)),
              }
            : undefined,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch occurrences by filters.',
        error.message,
      );
    }
  }

  async occurrenceReview(
    occurrenceId: string,
    status: OccurrenceStatus,
  ): Promise<void> {
    try {
      await this.prisma.occurrence.update({
        where: {
          id: occurrenceId,
        },
        data: {
          status: status,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to review occurrence.',
        error.message,
      );
    }
  }

  async validatesOccurrenceBasedOnNumberOfInteractions(
    occurrenceId: string,
  ): Promise<void> {
    try {
      const occurrence = await this.findOne(occurrenceId);
      if (!occurrence) {
        throw new NotFoundException('Occurrence not found');
      }
      const interactions = await this.prisma.interaction.findMany({
        where: {
          occurrenceId: occurrenceId,
        },
      });

      const supportInteractionsLength =
        interactions.filter(
          (interaction) =>
            interaction.type === InteractionType.SUPPORT &&
            interaction.createdAt > new Date(Date.now() - LAST_HOUR), // Últimas 2 horas
        )?.length ?? 0;

      const disputeInteractionsLength =
        interactions.filter(
          (interaction) =>
            interaction.type === InteractionType.DISPUTE &&
            interaction.createdAt > new Date(Date.now() - LAST_HOUR), // Últimas 2 horas
        )?.length ?? 0;

      if (supportInteractionsLength >= disputeInteractionsLength) {
        await this.update(occurrenceId, { status: OccurrenceStatus.APPROVED });
      } else {
        await this.update(occurrenceId, { status: OccurrenceStatus.CLOSED });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to validate occurrence based on number of interactions.',
        error.message,
      );
    }
  }

  async findApprovedOlderThan(hours: number): Promise<Occurrence[]> {
    try {
      const pendingOccurrences = await this.prisma.occurrence.findMany({
        where: {
          status: OccurrenceStatus.APPROVED,
          createdAt: {
            lt: new Date(Date.now() - hours * 60 * 60 * 1000),
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: 1000,
        skip: 0,
      });
      return pendingOccurrences;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch pending occurrences.',
        error.message,
      );
    }
  }
}
