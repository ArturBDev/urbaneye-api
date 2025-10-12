// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

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
      passwordHash: 'password',
      role: 'CITIZEN',
    },
    update: {
      name: 'John Doe',
      passwordHash: 'password',
      role: 'CITIZEN',
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
      title: 'Occurrence 1',
      description: 'Description 1',
      latitude: 10,
      longitude: 10,
      userId: user.id,
    },
    update: {
      title: 'Occurrence 1',
      description: 'Description 1',
      latitude: 10,
      longitude: 10,
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
    },
    update: {
      title: 'Alert 1',
      description: 'Description 1',
      type: 'AUTOMATIC',
      level: 'LOW',
    },
  });

  // create a new climate history
  await prisma.climateHistory.upsert({
    where: {
      id: 'climate-1',
    },
    create: {
      id: 'climate-1',
      date: new Date(),
      temperature: 10,
      precipitation: 10,
      humidity: 10,
      wind: 10,
      locationId: location.id,
    },
    update: {
      date: new Date(),
      temperature: 10,
      precipitation: 10,
      humidity: 10,
      wind: 10,
    },
  });

  // create a new feedback
  await prisma.feedback.upsert({
    where: {
      id: 'feedback-1',
    },
    create: {
      id: 'feedback-1',
      description: 'Feedback 1',
      stillHappening: true,
      userId: user.id,
      occurrenceId: occurrence.id,
    },
    update: {
      description: 'Feedback 1',
      stillHappening: true,
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
