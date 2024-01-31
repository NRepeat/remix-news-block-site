-- DropForeignKey
ALTER TABLE "TagPost" DROP CONSTRAINT "TagPost_tagId_fkey";

-- AddForeignKey
ALTER TABLE "TagPost" ADD CONSTRAINT "TagPost_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
