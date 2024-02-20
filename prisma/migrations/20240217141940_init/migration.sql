-- DropForeignKey
ALTER TABLE `client` DROP FOREIGN KEY `Client_paymentConfigId_fkey`;

-- AlterTable
ALTER TABLE `client` MODIFY `paymentConfigId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_paymentConfigId_fkey` FOREIGN KEY (`paymentConfigId`) REFERENCES `PaymentConfig`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
