import { prisma } from "../../lib/prisma";

export const recipeRepository = {
  findAllByUser: (userId: string) =>
    prisma.recipe.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    }),

  findById: (id: string) =>
    prisma.recipe.findUnique({
      where: {
        id,
      },
    }),

  findAll: () =>
    prisma.recipe.findMany({
      orderBy: {
        name: "asc",
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
