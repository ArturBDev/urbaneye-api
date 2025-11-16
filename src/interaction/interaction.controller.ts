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

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @UseGuards(JwtAuthGuard)
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
  async create(
    @Body() createInteractionDto: CreateInteractionDto,
  ): Promise<Interaction> {
    return await this.interactionService.create(createInteractionDto);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
    return await this.interactionService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
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
  ): Promise<Interaction> {
    return await this.interactionService.update(id, updateInteractionDto);
  }

  @UseGuards(JwtAuthGuard)
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
    await this.interactionService.remove(id);
  }
}
