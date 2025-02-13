-- CreateTable
CREATE TABLE "HeaderPages" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "image" TEXT NOT NULL,
    "opacity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeaderPages_pkey" PRIMARY KEY ("id")
);
