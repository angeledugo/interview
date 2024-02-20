/*
  Warnings:

  - A unique constraint covering the columns `[paymentConfigId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentConfigId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `paymentConfigId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `PaymentConfig` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentType` ENUM('hour', 'monthly') NOT NULL DEFAULT 'hour',
    `amount` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Client_paymentConfigId_key` ON `Client`(`paymentConfigId`);

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_paymentConfigId_fkey` FOREIGN KEY (`paymentConfigId`) REFERENCES `PaymentConfig`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
