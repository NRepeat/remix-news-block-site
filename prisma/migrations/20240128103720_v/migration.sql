/*
  Warnings:

  - You are about to drop the column `postId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_postId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "postId";
