/*
  Warnings:

  - You are about to drop the column `max_age` on the `indicator_range` table. All the data in the column will be lost.
  - You are about to drop the column `min_age` on the `indicator_range` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "first_name" TEXT NOT NULL DEFAULT 'Невідомо',
ADD COLUMN     "last_name" TEXT NOT NULL DEFAULT 'Невідомо';

-- AlterTable
ALTER TABLE "indicator_range" DROP COLUMN "max_age",
DROP COLUMN "min_age";
