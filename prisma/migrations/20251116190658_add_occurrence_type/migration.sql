/*
  Warnings:

  - The values [VALIDATED,RESOLVED,IGNORED] on the enum `OccurrenceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "OccurrenceType" AS ENUM ('FLOODING', 'FIRE', 'ELECTRICITY', 'TRAFFIC_CONGESTION', 'TRAFFIC_LIGHT_OUTAGE', 'ROAD_BLOCKAGE', 'ROAD_ACCIDENT', 'ROAD_CONSTRUCTION', 'ROAD_MAINTENANCE', 'ROAD_SIGNALING', 'THEFT', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "OccurrenceStatus_new" AS ENUM ('PENDING', 'REJECTED', 'APPROVED', 'CANCELLED', 'CLOSED');
ALTER TABLE "public"."Occurrence" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Occurrence" ALTER COLUMN "status" TYPE "OccurrenceStatus_new" USING ("status"::text::"OccurrenceStatus_new");
ALTER TYPE "OccurrenceStatus" RENAME TO "OccurrenceStatus_old";
ALTER TYPE "OccurrenceStatus_new" RENAME TO "OccurrenceStatus";
DROP TYPE "public"."OccurrenceStatus_old";
ALTER TABLE "Occurrence" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Occurrence" ADD COLUMN     "occurrenceType" "OccurrenceType" NOT NULL DEFAULT 'OTHER';
