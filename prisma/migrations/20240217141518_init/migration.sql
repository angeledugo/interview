/*
  Warnings:

  - You are about to alter the column `amount` on the `paymentconfig` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `paymentconfig` MODIFY `amount` DOUBLE NOT NULL;
