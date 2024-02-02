-- DropForeignKey
ALTER TABLE "Baner" DROP CONSTRAINT "Baner_imageId_fkey";

-- AlterTable
ALTER TABLE "Baner" ALTER COLUMN "imageId" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Baner" ADD CONSTRAINT "Baner_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
