/*
  Warnings:

  - The primary key for the `Clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `clientId` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- AlterTable
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Clients_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "clientId",
ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
