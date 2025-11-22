import { PrismaClient, OccurrenceStatus, OccurrenceType, UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const POA_LAT = -30.0346;
const POA_LNG = -51.2177;

// Helper to generate random coordinates around a center point
function getRandomCoordinate(center: number, radius: number) {
  const y0 = center;
  const x0 = center;
  const rd = radius / 111300; // about 111300 meters in one degree

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  return {
    latitude: y + center,
    longitude: x + center // Simplified, good enough for small radius
  };
}

// Better random coordinate generator for lat/lng
function getRandomLocation(lat: number, lng: number, radiusInKm: number) {
    const r = radiusInKm / 111.32; // approximate degrees
    const u = Math.random();
    const v = Math.random();
    const w = r * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);
    
    // Adjust longitude for latitude shrinking
    const newLat = y + lat;
    const newLng = x / Math.cos(lat * Math.PI / 180) + lng;

    return { latitude: newLat, longitude: newLng };
}


async function main() {
  console.log('Start seeding Porto Alegre occurrences...');

  // Ensure we have a user to attach occurrences to
  const user = await prisma.user.upsert({
    where: { email: 'poa.admin@example.com' },
    update: {},
    create: {
      name: 'POA Admin',
      email: 'poa.admin@example.com',
      passwordHash: await bcrypt.hash('password', 10),
      type: UserType.PUBLIC_AGENCY,
      city: 'Porto Alegre',
      state: 'RS',
      country: 'BR',
    },
  });

  const occurrenceTypes = Object.values(OccurrenceType);
  const statuses = Object.values(OccurrenceStatus);

  const occurrencesToCreate = 20;

  for (let i = 0; i < occurrencesToCreate; i++) {
    const location = getRandomLocation(POA_LAT, POA_LNG, 5); // 5km radius
    const type = occurrenceTypes[Math.floor(Math.random() * occurrenceTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    await prisma.occurrence.create({
      data: {
        title: `Mock ${type} in POA #${i + 1}`,
        description: `This is a mock occurrence of type ${type} generated for testing purposes in Porto Alegre.`,
        latitude: location.latitude,
        longitude: location.longitude,
        status: status,
        occurrenceType: type,
        userId: user.id,
        city: 'Porto Alegre',
        state: 'RS',
        country: 'BR',
        zipCode: '90000-000',
        address: `Random Address #${i + 1}`,
        street: 'Random Street',
        number: `${Math.floor(Math.random() * 1000)}`,
      },
    });
  }

  console.log(`Seeding finished. Created ${occurrencesToCreate} occurrences.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
