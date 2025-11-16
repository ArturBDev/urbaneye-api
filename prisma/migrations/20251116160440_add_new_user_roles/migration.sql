/*
  Warnings:

  - The values [ADMIN,SUPER_ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('CITIZEN', 'PUBLIC_AGENCY', 'COMPANY');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
COMMIT;
