/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Contact";

-- CreateTable
CREATE TABLE "Footer" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "copyright" TEXT,
    "location" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "workingHourse" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);
