/*
  Warnings:

  - Added the required column `userEntry` to the `UserNavigation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserNavigation" ADD COLUMN     "userEntry" TIMESTAMP(3) NOT NULL;
