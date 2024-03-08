/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Error` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `Error` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Error" ADD COLUMN     "hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Error_hash_key" ON "Error"("hash");
