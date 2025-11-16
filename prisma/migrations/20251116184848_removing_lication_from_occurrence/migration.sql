/*
  Warnings:

  - You are about to drop the column `locationId` on the `Occurrence` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Occurrence" DROP CONSTRAINT "Occurrence_locationId_fkey";

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "locationId";
