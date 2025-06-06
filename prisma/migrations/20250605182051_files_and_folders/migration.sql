/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Itemtype" AS ENUM ('file', 'folder');

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Driveitem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Itemtype" NOT NULL,
    "size" INTEGER,
    "url" TEXT,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driveitem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Driveitem_parentId_idx" ON "Driveitem"("parentId");

-- AddForeignKey
ALTER TABLE "Driveitem" ADD CONSTRAINT "Driveitem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Driveitem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
