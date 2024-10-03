/*
  Warnings:

  - You are about to drop the `employee_role` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('super_admin', 'admin', 'med_worker');

-- DropForeignKey
ALTER TABLE "employee_role" DROP CONSTRAINT "employee_role_employee_id_fkey";

-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'med_worker';

-- DropTable
DROP TABLE "employee_role";
