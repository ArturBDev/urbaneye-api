//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { verifyIdToken } from 'apple-signin-auth';
import { AppleAuthDto } from './dto/apple-auth.dto';
import { UserType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async loginWithApple(dto: AppleAuthDto): Promise<AuthEntity> {
    try {
      const { identityToken, firstName, lastName } = dto;
      const appleIdTokenClaims = await verifyIdToken(identityToken, {
        // clientId: 'com.your.app.bundle.id', // Optional: Verify audience
      });

      const email = appleIdTokenClaims.email;

      if (!email) {
        throw new UnauthorizedException('Apple ID token does not contain email');
      }

      let user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        // Create new user
        const name =
          firstName && lastName ? `${firstName} ${lastName}` : 'Apple User';

        // Generate a random password since they login via Apple
        const randomPassword = Math.random().toString(36).slice(-8);
        const passwordHash = await bcrypt.hash(randomPassword, 10);

        user = await this.prisma.user.create({
          data: {
            email,
            name,
            passwordHash,
            type: UserType.CITIZEN, // Default type
          },
        });
      }

      return {
        accessToken: this.jwtService.sign({ userId: user.id }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Apple ID token');
    }
  }
}
