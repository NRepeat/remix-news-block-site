/*
  Warnings:

  - You are about to drop the column `order` on the `Baner` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Baner` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ImageCarousel` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Text` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Text` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Text_order_pageId_key";

-- AlterTable
ALTER TABLE "Baner" DROP COLUMN "order",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "ImageCarousel" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "order",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Text" DROP COLUMN "order",
DROP COLUMN "type";
