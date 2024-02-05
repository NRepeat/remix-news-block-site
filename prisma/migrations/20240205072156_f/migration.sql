-- DropForeignKey
ALTER TABLE "PostCarouselPost" DROP CONSTRAINT "PostCarouselPost_postId_fkey";

-- AddForeignKey
ALTER TABLE "PostCarouselPost" ADD CONSTRAINT "PostCarouselPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
