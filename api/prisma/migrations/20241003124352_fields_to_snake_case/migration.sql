/*
  Warnings:

  - You are about to drop the column `createdAt` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `employee_role` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `indicator` table. All the data in the column will be lost.
  - You are about to drop the column `testTypeId` on the `indicator` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `indicator_range` table. All the data in the column will be lost.
  - You are about to drop the column `indicatorId` on the `indicator_range` table. All the data in the column will be lost.
  - You are about to drop the column `maxAge` on the `indicator_range` table. All the data in the column will be lost.
  - You are about to drop the column `maxValue` on the `indicator_range` table. All the data in the column will be lost.
  - You are about to drop the column `minAge` on the `indicator_range` table. All the data in the column will be lost.
  - You are about to drop the column `minValue` on the `indicator_range` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `test` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `test` table. All the data in the column will be lost.
  - You are about to drop the column `indicatorRangeId` on the `test` table. All the data in the column will be lost.
  - You are about to drop the column `resultValue` on the `test` table. All the data in the column will be lost.
  - You are about to drop the column `testDate` on the `test` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `test` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `test` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `test_type` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `employee_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `test_type_id` to the `indicator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indicator_id` to the `indicator_range` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_age` to the `indicator_range` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_value` to the `indicator_range` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_age` to the `indicator_range` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_value` to the `indicator_range` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indicator_range_id` to the `test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result_value` to the `test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `test_date` to the `test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_createdById_fkey";

-- DropForeignKey
ALTER TABLE "employee_role" DROP CONSTRAINT "employee_role_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "indicator" DROP CONSTRAINT "indicator_createdById_fkey";

-- DropForeignKey
ALTER TABLE "indicator" DROP CONSTRAINT "indicator_testTypeId_fkey";

-- DropForeignKey
ALTER TABLE "indicator_range" DROP CONSTRAINT "indicator_range_createdById_fkey";

-- DropForeignKey
ALTER TABLE "indicator_range" DROP CONSTRAINT "indicator_range_indicatorId_fkey";

-- DropForeignKey
ALTER TABLE "test" DROP CONSTRAINT "test_createdById_fkey";

-- DropForeignKey
ALTER TABLE "test" DROP CONSTRAINT "test_indicatorRangeId_fkey";

-- DropForeignKey
ALTER TABLE "test" DROP CONSTRAINT "test_userId_fkey";

-- DropForeignKey
ALTER TABLE "test_type" DROP CONSTRAINT "test_type_createdById_fkey";

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "createdAt",
DROP COLUMN "createdById",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_role" DROP COLUMN "employeeId",
ADD COLUMN     "employee_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "indicator" DROP COLUMN "createdById",
DROP COLUMN "testTypeId",
ADD COLUMN     "created_by_id" INTEGER,
ADD COLUMN     "test_type_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "indicator_range" DROP COLUMN "createdById",
DROP COLUMN "indicatorId",
DROP COLUMN "maxAge",
DROP COLUMN "maxValue",
DROP COLUMN "minAge",
DROP COLUMN "minValue",
ADD COLUMN     "created_by_id" INTEGER,
ADD COLUMN     "indicator_id" INTEGER NOT NULL,
ADD COLUMN     "max_age" INTEGER NOT NULL,
ADD COLUMN     "max_value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "min_age" INTEGER NOT NULL,
ADD COLUMN     "min_value" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "test" DROP COLUMN "createdAt",
DROP COLUMN "createdById",
DROP COLUMN "indicatorRangeId",
DROP COLUMN "resultValue",
DROP COLUMN "testDate",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" INTEGER,
ADD COLUMN     "indicator_range_id" INTEGER NOT NULL,
ADD COLUMN     "result_value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "test_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "test_type" DROP COLUMN "createdById",
ADD COLUMN     "created_by_id" INTEGER;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "birthDate",
DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "updatedAt",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_role" ADD CONSTRAINT "employee_role_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_type" ADD CONSTRAINT "test_type_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator" ADD CONSTRAINT "indicator_test_type_id_fkey" FOREIGN KEY ("test_type_id") REFERENCES "test_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator" ADD CONSTRAINT "indicator_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator_range" ADD CONSTRAINT "indicator_range_indicator_id_fkey" FOREIGN KEY ("indicator_id") REFERENCES "indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator_range" ADD CONSTRAINT "indicator_range_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_indicator_range_id_fkey" FOREIGN KEY ("indicator_range_id") REFERENCES "indicator_range"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
