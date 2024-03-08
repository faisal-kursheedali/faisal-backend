-- CreateTable
CREATE TABLE "Error" (
    "id" SERIAL NOT NULL,
    "message" TEXT,
    "name" TEXT,
    "stack" BYTEA,
    "count" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3)[],

    CONSTRAINT "Error_pkey" PRIMARY KEY ("id")
);
