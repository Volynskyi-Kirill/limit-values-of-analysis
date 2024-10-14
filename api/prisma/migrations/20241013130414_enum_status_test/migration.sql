/*
  Warnings:

  - The `status` column on the `test` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('awaiting_submission', 'in_progress', 'done');

-- AlterTable
ALTER TABLE "test" DROP COLUMN "status",
ADD COLUMN     "status" "TestStatus" NOT NULL DEFAULT 'awaiting_submission';
