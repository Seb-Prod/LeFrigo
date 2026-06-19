import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export const ingredientRepository = {
  findOrCreate(tx: Prisma.TransactionClient, name: string) {
    return tx.ingredient.upsert({
      where: { name },
      create: { name },
      update: {},
    });
  },

  search: (query: string) =>
    prisma.ingredient.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: { name: "asc" },
      take: 10,
    }),
};
