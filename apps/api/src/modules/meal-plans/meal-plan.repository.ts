import { prisma } from "../../lib/prisma";
export const mealPlanRepository = {
  findAllByUser: (userId: string) =>
    prisma.mealPlan.findMany({
      where: {
        userId,
      },

      include: {
        recipe: true,
      },

      orderBy: {
        date: "asc",
      },
    }),

  findByDateAndMealType: (
    date: Date,
    mealType: "LUNCH" | "DINNER",
    userId: string,
  ) =>
    prisma.mealPlan.findFirst({
      where: {
        date,
        mealType,
        userId,
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
