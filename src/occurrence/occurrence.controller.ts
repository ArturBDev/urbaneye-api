import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Query,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { OccurrenceService } from './occurrence.service';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { Occurrence } from './entities/occurrence.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import {
  InteractionType,
  OccurrenceStatus,
  User,
  UserRole,
} from '@prisma/client';
import { OccurrenceFiltersDto } from './dto/occurrence-filters.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('occurrence')
export class OccurrenceController {
  constructor(private readonly occurrenceService: OccurrenceService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new occurrence' })
  @ApiBody({ type: CreateOccurrenceDto })
  @ApiResponse({
    status: 201,
    description: 'Occurrence created successfully',
    type: Occurrence,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Body() createOccurrenceDto: CreateOccurrenceDto,
  ): Promise<Occurrence> {
    return await this.occurrenceService.create(createOccurrenceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all occurrences' })
  @ApiResponse({
    status: 200,
    description: 'Occurrences retrieved successfully',
    type: [Occurrence],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(): Promise<Occurrence[]> {
    return await this.occurrenceService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get an occurrence by id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The id of the occurrence',
  })
  @ApiResponse({
    status: 200,
    description: 'Occurrence retrieved successfully',
    type: Occurrence,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Occurrence not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string): Promise<Occurrence> {
    return await this.occurrenceService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update an occurrence' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The id of the occurrence',
  })
  @ApiBody({ type: UpdateOccurrenceDto })
  @ApiResponse({
    status: 200,
    description: 'Occurrence updated successfully',
    type: Occurrence,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Occurrence not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(
    @Param('id') id: string,
    @Body() updateOccurrenceDto: UpdateOccurrenceDto,
    @CurrentUser() currentUser: User,
  ): Promise<Occurrence> {
    const occurrence = await this.occurrenceService.findOne(id);
    if (!occurrence) {
      throw new NotFoundException('Occurrence not found');
    }
    if (
      currentUser.id !== occurrence.userId &&
      currentUser.role !== UserRole.SUPER_ADMIN &&
      currentUser.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return await this.occurrenceService.update(id, updateOccurrenceDto);
  }
  @ApiOperation({ summary: 'Delete an occurrence' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The id of the occurrence',
  })
  @ApiResponse({ status: 200, description: 'Occurrence deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Occurrence not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  async remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    const occurrence = await this.occurrenceService.findOne(id);
    if (!occurrence) {
      throw new NotFoundException('Occurrence not found');
    }
    if (
      currentUser.id !== occurrence.userId &&
      currentUser.role !== UserRole.SUPER_ADMIN &&
      currentUser.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    await this.occurrenceService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Get('user/')
  @ApiOperation({ summary: 'Get occurrences by user id' })
  @ApiResponse({
    status: 200,
    description: 'Occurrences retrieved successfully',
    type: [Occurrence],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getOccurrencesByUser(
    @CurrentUser() currentUser: User,
  ): Promise<Occurrence[]> {
    return await this.occurrenceService.getOccurrencesByUser(currentUser.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Get('filters')
  @ApiOperation({ summary: 'Get occurrences by filters' })
  @ApiBody({ type: OccurrenceFiltersDto })
  @ApiResponse({
    status: 200,
    description: 'Occurrences retrieved successfully',
    type: [Occurrence],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getOccurrencesByFilters(
    @Query() occurrenceFiltersDto: OccurrenceFiltersDto,
  ): Promise<Occurrence[]> {
    return await this.occurrenceService.getOccurrencesByFilters(
      occurrenceFiltersDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Get('location')
  @ApiOperation({ summary: 'Get occurrences by location' })
  @ApiQuery({ name: 'latitude', type: Number })
  @ApiQuery({ name: 'longitude', type: Number })
  @ApiQuery({ name: 'radius', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Occurrences retrieved successfully',
    type: [Occurrence],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getOccurrencesByLocation(
    @Query() latitude: number,
    @Query() longitude: number,
    @Query() radius: number,
  ): Promise<Occurrence[]> {
    return await this.occurrenceService.getOccurrencesByLocation(
      latitude,
      longitude,
      radius,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @Post('review/:id')
  @ApiOperation({ summary: 'Review an occurrence' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Occurrence reviewed successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Occurrence not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async occurrenceReview(
    @Param('id') id: string,
    @Body() occurrenceReviewDto: { status: OccurrenceStatus },
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    const occurrence = await this.occurrenceService.findOne(id);
    if (!occurrence) {
      throw new NotFoundException('Occurrence not found');
    }
    if (
      currentUser.role !== UserRole.SUPER_ADMIN &&
      currentUser.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    await this.occurrenceService.occurrenceReview(
      id,
      occurrenceReviewDto.status as OccurrenceStatus,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Post('react/:id/:reaction')
  @ApiOperation({ summary: 'React to an occurrence' })
  @ApiParam({ name: 'id', type: String })
  @ApiParam({ name: 'reaction', type: 'enum', enum: InteractionType })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Occurrence not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({
    status: 201,
    description: 'Occurrence reacted successfully',
  })
  async reactToOccurrence(
    @Param('id') id: string,
    @Param('reaction') reaction: InteractionType,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.occurrenceService.reactToOccurrence(
      id,
      reaction,
      currentUser.id,
    );
  }
}
