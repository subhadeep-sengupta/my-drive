/*
  Warnings:

  - The primary key for the `Driveitem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Driveitem" DROP CONSTRAINT "Driveitem_parentId_fkey";

-- AlterTable
ALTER TABLE "Driveitem" DROP CONSTRAINT "Driveitem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Driveitem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Driveitem_id_seq";

-- AddForeignKey
ALTER TABLE "Driveitem" ADD CONSTRAINT "Driveitem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Driveitem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
