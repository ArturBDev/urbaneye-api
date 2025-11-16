// prisma/seed.ts

import { PrismaClient, UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create a new user
  const user = await prisma.user.upsert({
    where: {
      email: 'john.doe@example.com',
    },
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await bcrypt.hash('password', 10),
      type: UserType.CITIZEN,
      phoneNumber: '+55 1234567890',
      zipCode: '123456',
      country: 'BR',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Jardim Paulista',
      street: 'Avenida Paulista',
      number: '123',
      complement: 'Apto 1',
      reference: 'Reference 1',
    },
    update: {
      name: 'John Doe',
      passwordHash: await bcrypt.hash('password', 10),
      type: UserType.CITIZEN,
      phoneNumber: '+55 1234567890',
      zipCode: '123456',
      country: 'BR',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Jardim Paulista',
      street: 'Avenida Paulista',
      number: '123',
      complement: 'Apto 1',
      reference: 'Reference 1',
    },
  });

  // create a new location
  const location = await prisma.location.upsert({
    where: {
      id: 'location-1',
    },
    create: {
      id: 'location-1',
      name: 'Location 1',
      city: 'City 1',
      state: 'State 1',
      latitude: 10,
      longitude: 10,
    },
    update: {
      name: 'Location 1',
      city: 'City 1',
      state: 'State 1',
      latitude: 10,
      longitude: 10,
    },
  });

  // create a new occurrence
  const occurrence = await prisma.occurrence.upsert({
    where: {
      id: 'occurrence-1',
    },
    create: {
      id: 'occurrence-1',
      title: 'Flooding on Main Street',
      description: 'Heavy rain caused flooding on Main Street',
      latitude: -23.5505,
      longitude: -46.6333,
      userId: user.id,
      locationId: location.id,
      address: 'Avenida Paulista, 1578',
      status: 'PENDING',
      imageUrl: 'https://example.com/flooding.jpg',
      zipCode: '01310-200',
      country: 'BR',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Avenida Paulista',
      number: '1578',
      complement: 'Next to MASP',
      reference: 'Near the MASP Museum',
    },
    update: {
      title: 'Flooding on Main Street',
      description: 'Heavy rain caused flooding on Main Street',
      latitude: -23.5505,
      longitude: -46.6333,
      address: 'Avenida Paulista, 1578',
      status: 'PENDING',
      imageUrl: 'https://example.com/flooding.jpg',
      zipCode: '01310-200',
      country: 'BR',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Avenida Paulista',
      number: '1578',
      complement: 'Next to MASP',
      reference: 'Near the MASP Museum',
    },
  });

  // create a new alert
  await prisma.alert.upsert({
    where: {
      id: 'alert-1',
    },
    create: {
      id: 'alert-1',
      title: 'Alert 1',
      description: 'Description 1',
      type: 'AUTOMATIC',
      level: 'LOW',
      occurrenceId: occurrence.id,
    },
    update: {
      title: 'Alert 1',
      description: 'Description 1',
      type: 'AUTOMATIC',
      level: 'LOW',
    },
  });

  // create a new interaction
  await prisma.interaction.upsert({
    where: {
      userId_occurrenceId: {
        userId: user.id,
        occurrenceId: occurrence.id,
      },
    },
    create: {
      type: 'SUPPORT',
      userId: user.id,
      occurrenceId: occurrence.id,
    },
    update: {
      type: 'SUPPORT',
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
