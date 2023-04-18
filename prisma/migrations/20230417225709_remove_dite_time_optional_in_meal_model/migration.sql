/*
  Warnings:

  - Made the column `date_time` on table `meals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "meals" ALTER COLUMN "date_time" SET NOT NULL,
ALTER COLUMN "date_time" SET DEFAULT CURRENT_TIMESTAMP;
