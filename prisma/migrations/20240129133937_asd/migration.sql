-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "title" SET DEFAULT '',
ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "article" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;
