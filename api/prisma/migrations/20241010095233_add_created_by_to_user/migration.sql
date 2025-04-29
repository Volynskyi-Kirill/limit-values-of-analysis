-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_by_id" INTEGER;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
