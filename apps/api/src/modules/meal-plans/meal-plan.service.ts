import { recipeRepository } from "apps/api/src/modules/recipes/recipe.repository";
import { AppError } from "../../core/errors/AppError";
import { mealPlanRepository } from "./meal-plan.repository";

export const mealPlanService = {
  getAll(userId: string) {
    return mealPlanRepository.findAllByUser(userId);
  },

  async create(
    date: Date,
    mealType: "LUNCH" | "DINNER",
    recipeId: string,
    userId: string,
  ) {
    const recipe = await recipeRepository.findById(recipeId);

    if (!recipe) {
      throw new AppError(
        404,

        "Recette introuvable",
      );
    }
    const existing = await mealPlanRepository.findByDateAndMealType(
      date,
      mealType,
      userId,
    );

    if (existing) {
      throw new AppError(409, "Repas déjà planifié");
    }

    return mealPlanRepository.create(date, mealType, recipeId, userId);
  },
};
