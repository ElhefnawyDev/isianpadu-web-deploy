-- CreateTable
CREATE TABLE "CoreValue" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "present" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreValue_pkey" PRIMARY KEY ("id")
);
