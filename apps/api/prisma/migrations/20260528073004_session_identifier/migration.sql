/*
  Warnings:

  - You are about to drop the column `sessionIdentifier` on the `Session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Session_sessionIdentifier_key` ON `Session`;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `sessionIdentifier`;
