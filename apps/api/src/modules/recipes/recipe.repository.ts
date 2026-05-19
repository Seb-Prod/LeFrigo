import { prisma } from "../../lib/prisma";

export const recipeRepository = {
  findAllByUser: (userId: string) =>
    prisma.recipe.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    }),

  create: (name: string, userId: string) =>
    prisma.recipe.create({
      data: {
        name,
        userId,
      },
    }),

  delete: (id: string) =>
    prisma.recipe.delete({
      where: { id },
    }),

};