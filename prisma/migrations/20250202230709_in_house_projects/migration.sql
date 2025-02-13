-- CreateTable
CREATE TABLE "InHouseProjects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ldescription" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InHouseProjects_pkey" PRIMARY KEY ("id")
);
