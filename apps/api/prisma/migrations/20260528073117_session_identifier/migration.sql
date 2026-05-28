/*
  Warnings:

  - A unique constraint covering the columns `[sessionIdentifier]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - The required column `sessionIdentifier` was added to the `Session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Session` ADD COLUMN `sessionIdentifier` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Session_sessionIdentifier_key` ON `Session`(`sessionIdentifier`);
