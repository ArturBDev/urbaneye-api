import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Interaction } from './entities/interaction.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User, UserRole } from '@prisma/client';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: CreateInteractionDto })
  @ApiResponse({
    status: 201,
    description: 'The interaction has been successfully created.',
    type: Interaction,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 409, description: 'Interaction already exists.' })
  @ApiOperation({ summary: 'Create a new interaction' })
  async create(
    @Body() createInteractionDto: CreateInteractionDto,
  ): Promise<Interaction> {
    return await this.interactionService.create(createInteractionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The interactions have been successfully retrieved.',
    type: [Interaction],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiOperation({ summary: 'Get all interactions' })
  async findAll(): Promise<Interaction[]> {
    return this.interactionService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The id of the interaction',
  })
  @ApiResponse({
    status: 200,
    description: 'The interaction has been successfully retrieved.',
    type: Interaction,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Interaction not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiOperation({ summary: 'Get an interaction by id' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<Interaction> {
    const interaction = await this.interactionService.findOne(id);
    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }
    if (
      currentUser.id !== interaction.userId &&
      currentUser.role !== UserRole.SUPER_ADMIN &&
      currentUser.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You are not authorized to get this interaction',
      );
    }
    return interaction;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiBody({ type: UpdateInteractionDto })
  @ApiResponse({
    status: 200,
    description: 'The interaction has been successfully updated.',
    type: Interaction,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Interaction not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiOperation({ summary: 'Update an interaction' })
  async update(
    @Param('id') id: string,
    @Body() updateInteractionDto: UpdateInteractionDto,
    @CurrentUser() currentUser: User,
  ): Promise<Interaction> {
    const interaction = await this.interactionService.findOne(id);
    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }
    if (
      currentUser.id !== interaction.userId &&
      currentUser.role !== UserRole.SUPER_ADMIN &&
      currentUser.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You are not authorized to update this interaction',
      );
    }
    return await this.interactionService.update(id, updateInteractionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The id of the interaction',
  })
  @ApiResponse({
    status: 200,
    description: 'The interaction has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Interaction not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiOperation({ summary: 'Delete an interaction' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    const interaction = await this.interactionService.findOne(id);
    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }

    if (
      currentUser.id !== interaction.userId &&
      currentUser.role !== UserRole.SUPER_ADMIN &&
      currentUser.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You are not authorized to delete this interaction',
      );
    }
    await this.interactionService.remove(id);
  }
}
