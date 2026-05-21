import { Request, Response } from "express";
import { mealPlanService } from "apps/api/src/modules/meal-plans/meal-plan.service";
import { asyncHandler } from "apps/api/src/utils/asyncHandler";
import { createMealPlanSchema } from "apps/api/src/modules/meal-plans/meal-plan.shemas";

type CreateMealPlanBody = {
  date: string;
  recipeId: string;
  mealType: "LUNCH" | "DINNER";
};

export const mealPlanController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const mealPlans = await mealPlanService.getAll(userId);

    return res.json(mealPlans);
  }),

  create: asyncHandler(
    async (req: Request<{}, {}, CreateMealPlanBody>, res: Response) => {
      const body = createMealPlanSchema.parse(req.body);
      const userId = req.user.userId;

      const mealPlan = await mealPlanService.create(
        new Date(body.date),
        body.mealType,
        body.recipeId,
        userId,
      );

      return res.status(201).json(mealPlan);
    },
  ),
};
