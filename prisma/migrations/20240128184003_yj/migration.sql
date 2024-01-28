-- AlterTable
ALTER TABLE "Baner" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'baner';

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE "ImageCarousel" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'imageCarousel';

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'page';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'post';

-- AlterTable
ALTER TABLE "PostCarousel" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'postCarousel';

-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'text';
