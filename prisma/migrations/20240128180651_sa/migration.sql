/*
  Warnings:

  - A unique constraint covering the columns `[order,pageId]` on the table `Text` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Text_order_pageId_key" ON "Text"("order", "pageId");
