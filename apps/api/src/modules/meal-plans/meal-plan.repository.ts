import { prisma } from "../../lib/prisma";

export const mealPlanRepository = {
  findAllByUser: (userId: string) =>
    prisma.mealPlan.findMany({
      where: { userId },
      orderBy: {
        date: "asc",
      },
    }),

  create: (
    date: Date,
    mealType: "LUNCH" | "DINNER",
    recipeId: string,
    userId: string,
  ) =>
    prisma.mealPlan.create({
      data: {
        date,
        mealType,
        recipeId,
        userId,
      },
    }),
};
