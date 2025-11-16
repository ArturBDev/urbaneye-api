/*
  Warnings:

  - Made the column `description` on table `Occurrence` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Occurrence` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationId` on table `Occurrence` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Occurrence" DROP CONSTRAINT "Occurrence_locationId_fkey";

-- AlterTable
ALTER TABLE "Occurrence" ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "neighborhood" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "number" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "street" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "zipCode" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "locationId" SET NOT NULL,
ALTER COLUMN "locationId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "neighborhood" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "number" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phoneNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "street" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "zipCode" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
