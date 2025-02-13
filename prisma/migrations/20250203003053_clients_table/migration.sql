-- CreateTable
CREATE TABLE "Clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "category" TEXT NOT NULL,
    "projectNumber" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);
