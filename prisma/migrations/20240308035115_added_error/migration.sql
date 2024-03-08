-- CreateTable
CREATE TABLE "Error" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3)[],
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,

    CONSTRAINT "Error_pkey" PRIMARY KEY ("id")
);
