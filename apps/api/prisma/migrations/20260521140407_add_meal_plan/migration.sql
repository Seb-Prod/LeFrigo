/*
  Warnings:

  - Added the required column `mealType` to the `MealPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MealPlan` ADD COLUMN `mealType` ENUM('LUNCH', 'DINNER') NOT NULL;
