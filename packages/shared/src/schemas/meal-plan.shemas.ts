import { z } from "zod";

export const createMealPlanSchema = z.object({
  date: z.string(),
  recipeId: z.uuid(),
  mealType: z.enum(["LUNCH", "DINNER"]),
});

export type CreateMealPlanDto = z.infer<typeof createMealPlanSchema>;
