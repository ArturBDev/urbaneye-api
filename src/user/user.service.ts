import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
export const roundsOfHashing = 10;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(
        createUserDto.passwordHash,
        roundsOfHashing,
      );

      // Check if user already exists by email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists.');
      }

      createUserDto.passwordHash = hashedPassword;

      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      if (email === undefined || email === null) {
        throw new UnprocessableEntityException('Email is required.');
      }

      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
      if (updateUserDto.passwordHash) {
        const hashedPassword = await bcrypt.hash(
          updateUserDto.passwordHash,
          roundsOfHashing,
        );
        updateUserDto.passwordHash = hashedPassword;
      }

      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
