/*
  Warnings:

  - Added the required column `readPages` to the `userBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userBook" ADD COLUMN     "readPages" INTEGER NOT NULL;
