import { mealPlanRepository } from "apps/api/src/modules/meal-plans/meal-plan.repository";

export const mealPlanService = {
  getAll(userId: string) {
    return mealPlanRepository.findAllByUser(userId);
  },

  create(
    date: Date,
    mealType: "LUNCH" | "DINNER",
    recipeId: string,
    userId: string,
  ) {
    return mealPlanRepository.create(date, mealType, recipeId, userId);
  },
};
