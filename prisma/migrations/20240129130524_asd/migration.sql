-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "content" TEXT NOT NULL DEFAULT '[]';
