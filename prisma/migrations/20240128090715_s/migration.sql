-- AlterTable
ALTER TABLE "Baner" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "ImageCarousel" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "ImageCarouselImage" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "PostCarousel" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "PostCarouselPost" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "order" INTEGER;
