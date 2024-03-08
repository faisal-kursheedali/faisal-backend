/*
  Warnings:

  - You are about to drop the column `count` on the `Error` table. All the data in the column will be lost.
  - Changed the type of `dateTime` on the `Error` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Error" DROP COLUMN "count",
ADD COLUMN     "userIP" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
DROP COLUMN "dateTime",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "stack" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Error" ADD CONSTRAINT "Error_userIP_fkey" FOREIGN KEY ("userIP") REFERENCES "Users"("userIP") ON DELETE CASCADE ON UPDATE CASCADE;
