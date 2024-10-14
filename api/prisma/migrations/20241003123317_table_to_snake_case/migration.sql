/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Indicator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndicatorRange` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_createdById_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeRole" DROP CONSTRAINT "EmployeeRole_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Indicator" DROP CONSTRAINT "Indicator_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Indicator" DROP CONSTRAINT "Indicator_testTypeId_fkey";

-- DropForeignKey
ALTER TABLE "IndicatorRange" DROP CONSTRAINT "IndicatorRange_createdById_fkey";

-- DropForeignKey
ALTER TABLE "IndicatorRange" DROP CONSTRAINT "IndicatorRange_indicatorId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_indicatorRangeId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestType" DROP CONSTRAINT "TestType_createdById_fkey";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "EmployeeRole";

-- DropTable
DROP TABLE "Indicator";

-- DropTable
DROP TABLE "IndicatorRange";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "TestType";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "employee_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdById" INTEGER,

    CONSTRAINT "test_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicator" (
    "id" SERIAL NOT NULL,
    "testTypeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "description" TEXT,
    "createdById" INTEGER,

    CONSTRAINT "indicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicator_range" (
    "id" SERIAL NOT NULL,
    "indicatorId" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "minValue" DOUBLE PRECISION NOT NULL,
    "maxValue" DOUBLE PRECISION NOT NULL,
    "createdById" INTEGER,

    CONSTRAINT "indicator_range_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "indicatorRangeId" INTEGER NOT NULL,
    "resultValue" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "test_type_name_key" ON "test_type"("name");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_role" ADD CONSTRAINT "employee_role_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_type" ADD CONSTRAINT "test_type_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator" ADD CONSTRAINT "indicator_testTypeId_fkey" FOREIGN KEY ("testTypeId") REFERENCES "test_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator" ADD CONSTRAINT "indicator_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator_range" ADD CONSTRAINT "indicator_range_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator_range" ADD CONSTRAINT "indicator_range_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_indicatorRangeId_fkey" FOREIGN KEY ("indicatorRangeId") REFERENCES "indicator_range"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
