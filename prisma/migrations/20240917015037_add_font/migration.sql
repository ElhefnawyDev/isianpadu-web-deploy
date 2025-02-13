-- CreateTable
CREATE TABLE "Font" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "font" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Font_pkey" PRIMARY KEY ("id")
);
