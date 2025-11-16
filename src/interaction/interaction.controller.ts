import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Interaction } from './entities/interaction.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from '@prisma/client';

// Endpoint to manage generate statistics for occurrences
@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
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
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
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
  async findOne(@Param('id') id: string): Promise<Interaction> {
    const interaction = await this.interactionService.findOne(id);
    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }

    return interaction;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
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
  async remove(@Param('id') id: string): Promise<void> {
    const interaction = await this.interactionService.findOne(id);
    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }

    await this.interactionService.remove(id);
  }
}
