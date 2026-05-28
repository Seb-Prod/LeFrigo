/*
  Warnings:

  - A unique constraint covering the columns `[sessionIdentifier]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Session` ADD COLUMN `sessionIdentifier` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Session_sessionIdentifier_key` ON `Session`(`sessionIdentifier`);
