/*
  Warnings:

  - You are about to drop the column `message` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `address` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workingHourse` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "message",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "workingHourse" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "HomeGeneralInfo" (
    "id" SERIAL NOT NULL,
    "title1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image1" TEXT NOT NULL,
    "image2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeGeneralInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperiencesGenralInfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExperiencesGenralInfo_pkey" PRIMARY KEY ("id")
);
