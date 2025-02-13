-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "hsDescription" TEXT,
ADD COLUMN     "image2" TEXT,
ADD COLUMN     "image3" TEXT,
ADD COLUMN     "lDescription" TEXT,
ALTER COLUMN "image" DROP NOT NULL;
