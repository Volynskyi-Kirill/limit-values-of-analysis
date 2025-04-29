/*
  Warnings:

  - The values [awaiting_submission] on the enum `TestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TestStatus_new" AS ENUM ('in_progress', 'done');
ALTER TABLE "test" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "test" ALTER COLUMN "status" TYPE "TestStatus_new" USING ("status"::text::"TestStatus_new");
ALTER TYPE "TestStatus" RENAME TO "TestStatus_old";
ALTER TYPE "TestStatus_new" RENAME TO "TestStatus";
DROP TYPE "TestStatus_old";
ALTER TABLE "test" ALTER COLUMN "status" SET DEFAULT 'in_progress';
COMMIT;

-- AlterTable
ALTER TABLE "test" ALTER COLUMN "status" SET DEFAULT 'in_progress';
