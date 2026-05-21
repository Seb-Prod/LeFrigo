export type MealType = "LUNCH" | "DINNER";

export interface MealPlan {
  id: string;
  date: string;
  mealType: MealType;
  recipeId: string;
  userId: string;
  createAt: string;
  recipe: { id: string; name: string };
}
