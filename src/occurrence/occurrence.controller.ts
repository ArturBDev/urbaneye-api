import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
  ApiResponse,
} from '@nestjs/swagger';
import { Occurrence } from './entities/occurrence.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from '@prisma/client';

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
  @Roles(UserRole.SUPER_ADMIN)
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
  ): Promise<Occurrence> {
    return await this.occurrenceService.update(id, updateOccurrenceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
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
  async remove(@Param('id') id: string): Promise<void> {
    await this.occurrenceService.remove(id);
  }
}
