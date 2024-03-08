/*
  Warnings:

  - You are about to drop the column `hash` on the `Error` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Error_hash_key";

-- AlterTable
ALTER TABLE "Error" DROP COLUMN "hash";
