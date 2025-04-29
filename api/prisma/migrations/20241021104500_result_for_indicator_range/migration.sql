-- AlterTable
ALTER TABLE "indicator_range" ADD COLUMN     "result" TEXT,
ALTER COLUMN "max_value" DROP NOT NULL,
ALTER COLUMN "min_value" DROP NOT NULL;
