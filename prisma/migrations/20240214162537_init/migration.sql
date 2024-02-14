/*
  Warnings:

  - You are about to drop the column `apellido` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `client` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` DROP COLUMN `apellido`,
    DROP COLUMN `nombre`,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL;
