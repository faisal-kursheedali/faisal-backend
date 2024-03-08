/*
  Warnings:

  - Made the column `message` on table `Error` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Error` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stack` on table `Error` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Error" ALTER COLUMN "message" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "stack" SET NOT NULL;
