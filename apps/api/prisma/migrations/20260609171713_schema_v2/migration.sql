/*
  Warnings:

  - You are about to drop the column `date` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `mealType` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `MealPlan` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `householdId` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MealPlan` DROP FOREIGN KEY `MealPlan_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `MealPlan` DROP FOREIGN KEY `MealPlan_userId_fkey`;

-- DropIndex
DROP INDEX `MealPlan_recipeId_fkey` ON `MealPlan`;

-- DropIndex
DROP INDEX `MealPlan_userId_fkey` ON `MealPlan`;

-- AlterTable
ALTER TABLE `MealPlan` DROP COLUMN `date`,
    DROP COLUMN `mealType`,
    DROP COLUMN `recipeId`,
    DROP COLUMN `userId`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `householdId` VARCHAR(191) NOT NULL,
    ADD COLUMN `maxVotesPerUser` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('VOTING', 'CONFIRMED', 'ARCHIVED') NOT NULL DEFAULT 'VOTING',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `cookingTime` INTEGER NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `preparationTime` INTEGER NULL,
    ADD COLUMN `servings` INTEGER NULL,
    ADD COLUMN `status` ENUM('PENDING', 'PUBLISHED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `RecipeStep` (
    `id` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `instruction` TEXT NOT NULL,

    INDEX `RecipeStep_recipeId_idx`(`recipeId`),
    UNIQUE INDEX `RecipeStep_recipeId_position_key`(`recipeId`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ingredient_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeIngredient` (
    `id` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `ingredientId` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NULL,
    `unit` VARCHAR(191) NULL,

    INDEX `RecipeIngredient_recipeId_idx`(`recipeId`),
    INDEX `RecipeIngredient_ingredientId_idx`(`ingredientId`),
    UNIQUE INDEX `RecipeIngredient_recipeId_ingredientId_key`(`recipeId`, `ingredientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeSuggestion` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `mealPlanId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RecipeSuggestion_mealPlanId_idx`(`mealPlanId`),
    INDEX `RecipeSuggestion_status_idx`(`status`),
    UNIQUE INDEX `RecipeSuggestion_userId_mealPlanId_recipeId_key`(`userId`, `mealPlanId`, `recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Household` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `restrictedMode` BOOLEAN NOT NULL DEFAULT false,
    `maxSuggestionsPerPeriod` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseholdMember` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `householdId` VARCHAR(191) NOT NULL,
    `role` ENUM('OWNER', 'MEMBER', 'VIEWER') NOT NULL DEFAULT 'VIEWER',
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `HouseholdMember_userId_idx`(`userId`),
    INDEX `HouseholdMember_householdId_idx`(`householdId`),
    UNIQUE INDEX `HouseholdMember_userId_householdId_key`(`userId`, `householdId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseholdRecipe` (
    `id` VARCHAR(191) NOT NULL,
    `householdId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `HouseholdRecipe_householdId_idx`(`householdId`),
    INDEX `HouseholdRecipe_recipeId_idx`(`recipeId`),
    UNIQUE INDEX `HouseholdRecipe_householdId_recipeId_key`(`householdId`, `recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseholdInvite` (
    `id` VARCHAR(191) NOT NULL,
    `householdId` VARCHAR(191) NOT NULL,
    `invitedById` VARCHAR(191) NOT NULL,
    `invitedUserId` VARCHAR(191) NOT NULL,
    `role` ENUM('OWNER', 'MEMBER', 'VIEWER') NOT NULL DEFAULT 'VIEWER',
    `status` ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `HouseholdInvite_householdId_idx`(`householdId`),
    INDEX `HouseholdInvite_invitedUserId_idx`(`invitedUserId`),
    INDEX `HouseholdInvite_status_idx`(`status`),
    UNIQUE INDEX `HouseholdInvite_householdId_invitedUserId_key`(`householdId`, `invitedUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealPlanSlot` (
    `id` VARCHAR(191) NOT NULL,
    `mealPlanId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `mealType` ENUM('LUNCH', 'DINNER') NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,

    INDEX `MealPlanSlot_mealPlanId_idx`(`mealPlanId`),
    UNIQUE INDEX `MealPlanSlot_mealPlanId_date_mealType_key`(`mealPlanId`, `date`, `mealType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealPlanCandidate` (
    `id` VARCHAR(191) NOT NULL,
    `mealPlanId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,

    INDEX `MealPlanCandidate_mealPlanId_idx`(`mealPlanId`),
    UNIQUE INDEX `MealPlanCandidate_mealPlanId_recipeId_key`(`mealPlanId`, `recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `mealPlanId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Vote_mealPlanId_idx`(`mealPlanId`),
    INDEX `Vote_userId_idx`(`userId`),
    INDEX `Vote_recipeId_idx`(`recipeId`),
    UNIQUE INDEX `Vote_userId_mealPlanId_recipeId_key`(`userId`, `mealPlanId`, `recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `MealPlan_householdId_idx` ON `MealPlan`(`householdId`);

-- CreateIndex
CREATE INDEX `MealPlan_status_idx` ON `MealPlan`(`status`);

-- CreateIndex
CREATE INDEX `Recipe_status_idx` ON `Recipe`(`status`);

-- AddForeignKey
ALTER TABLE `RecipeStep` ADD CONSTRAINT `RecipeStep_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeSuggestion` ADD CONSTRAINT `RecipeSuggestion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeSuggestion` ADD CONSTRAINT `RecipeSuggestion_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeSuggestion` ADD CONSTRAINT `RecipeSuggestion_mealPlanId_fkey` FOREIGN KEY (`mealPlanId`) REFERENCES `MealPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseholdMember` ADD CONSTRAINT `HouseholdMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseholdMember` ADD CONSTRAINT `HouseholdMember_householdId_fkey` FOREIGN KEY (`householdId`) REFERENCES `Household`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseholdRecipe` ADD CONSTRAINT `HouseholdRecipe_householdId_fkey` FOREIGN KEY (`householdId`) REFERENCES `Household`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseholdRecipe` ADD CONSTRAINT `HouseholdRecipe_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseholdInvite` ADD CONSTRAINT `HouseholdInvite_householdId_fkey` FOREIGN KEY (`householdId`) REFERENCES `Household`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseholdInvite` ADD CONSTRAINT `HouseholdInvite_invitedById_fkey` FOREIGN KEY (`invitedById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseholdInvite` ADD CONSTRAINT `HouseholdInvite_invitedUserId_fkey` FOREIGN KEY (`invitedUserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealPlan` ADD CONSTRAINT `MealPlan_householdId_fkey` FOREIGN KEY (`householdId`) REFERENCES `Household`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealPlanSlot` ADD CONSTRAINT `MealPlanSlot_mealPlanId_fkey` FOREIGN KEY (`mealPlanId`) REFERENCES `MealPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealPlanSlot` ADD CONSTRAINT `MealPlanSlot_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealPlanCandidate` ADD CONSTRAINT `MealPlanCandidate_mealPlanId_fkey` FOREIGN KEY (`mealPlanId`) REFERENCES `MealPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealPlanCandidate` ADD CONSTRAINT `MealPlanCandidate_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_mealPlanId_fkey` FOREIGN KEY (`mealPlanId`) REFERENCES `MealPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Recipe` RENAME INDEX `Recipe_userId_fkey` TO `Recipe_userId_idx`;
