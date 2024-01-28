-- AlterTable
ALTER TABLE "Baner" ADD COLUMN     "pageId" INTEGER;

-- AlterTable
ALTER TABLE "ImageCarousel" ADD COLUMN     "pageId" INTEGER;

-- AlterTable
ALTER TABLE "PostCarousel" ADD COLUMN     "pageId" INTEGER;

-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "pageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Baner" ADD CONSTRAINT "Baner_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageCarousel" ADD CONSTRAINT "ImageCarousel_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCarousel" ADD CONSTRAINT "PostCarousel_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
