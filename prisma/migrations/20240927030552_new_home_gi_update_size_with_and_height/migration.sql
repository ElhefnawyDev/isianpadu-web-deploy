/*
  Warnings:

  - You are about to drop the column `size` on the `HomeGeneralInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HomeGeneralInfo" DROP COLUMN "size",
ADD COLUMN     "height" TEXT,
ADD COLUMN     "width" TEXT;
