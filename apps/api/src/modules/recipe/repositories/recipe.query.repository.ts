import { prisma } from "../../../lib/prisma";
import { toSafeRecipe, toSafeRecipeSummary } from "../recipe.seralizer";
import {
  RECIPE_FULL_INCLUDE,
  RECIPE_SUMMARY_INCLUDE,
} from "./recipe.constants";
import { config } from "../../../core/config/";
import { RecipeFilters } from "../types/recipe-filters";
import { Prisma } from "@prisma/client";

export const recipeQueryRepository = {
  /** Retourne une recette complète par son ID. */
  findById: async (recipeId: string) => {
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId, deletedAt: null },
      include: RECIPE_FULL_INCLUDE,
    });

    if (!recipe) return null;

    return toSafeRecipe(recipe);
  },

  /** Retourne la liste paginée des recettes d'un utilisateur. */
  findByUser: async (userId: string, page = 1, limit = 10) => {
    const recipes = await prisma.recipe.findMany({
      where: { userId, deletedAt: null },
      include: RECIPE_FULL_INCLUDE,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return recipes.map(toSafeRecipeSummary);
  },

  /** Retourne le nombre toral de recettes d'un utilisateur. */
  countByUser: (userId: string) =>
    prisma.recipe.count({
      where: { userId, deletedAt: null },
    }),

  /** Retourne les N dernières recettes publiées tous utilisateurs confondus. */
  findRecent: async (limit = config.recipes.recentLimit) => {
    const recipes = await prisma.recipe.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      include: RECIPE_SUMMARY_INCLUDE,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return recipes.map(toSafeRecipeSummary);
  },

  /** Retourne les N recettes aléatoire publiées.
   * utilise une requête SQL brute - Prisma n'exporse pas ORDER BY RAND().
   */
  findRandom: async (limit = config.recipes.randomLimit) => {
    const recipes = await prisma.$queryRaw<any[]>`
      SELECT r.id
      FROM Recipe r 
      WHERE r.status = 'PUBLISHED'
        AND r.deletedAt IS null
      ORDER BY RAND()
      LIMIT ${limit}
    `;

    const ids = recipes.map((r) => r.id);

    const full = await prisma.recipe.findMany({
      where: { id: { in: ids } },
      include: RECIPE_SUMMARY_INCLUDE,
    });

    return full.map(toSafeRecipeSummary);
  },

  /**  */
  findQuickPrep: async (
    page = 1,
    pageSize = config.recipes.quickPrepLimit,
    maxPrepTime = config.recipes.quickPrepMaxTime,
  ) => {
    const where = {
      status: "PUBLISHED" as const,
      deletedAt: null,
      preparationTime: { lte: maxPrepTime },
    };

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        include: RECIPE_SUMMARY_INCLUDE,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.recipe.count({ where }),
    ]);

    return {
      recipes: recipes.map(toSafeRecipeSummary),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  /**  */
  findQuickMeal: async (
    limit = config.recipes.quickMealLimit,
    maxTotalTime = config.recipes.quickMealMaxTime,
  ) => {
    const recipes = await prisma.recipe.findMany({
      where: {
        status: "PUBLISHED",
        deletedAt: null,
        totalTime: { lte: maxTotalTime },
      },
      include: RECIPE_SUMMARY_INCLUDE,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return recipes.map(toSafeRecipeSummary);
  },

  find: async (filters: RecipeFilters) => {
    const where: Prisma.RecipeWhereInput = {
      deletedAt: null,
      status: "PUBLISHED",
    };

    if (filters.maxPreparationTime) {
      where.preparationTime = {
        lte: filters.maxPreparationTime,
      };
    }

    if (filters.maxCookingTime) {
      where.cookingTime = {
        lte: filters.maxCookingTime,
      };
    }

    if (filters.maxTotalTime) {
      where.totalTime = {
        lte: filters.maxTotalTime,
      };
    }

    if (filters.search) {
      where.OR = [
        {
          name: {
            contains: filters.search,
          },
        },

        {
          description: {
            contains: filters.search,
          },
        },
      ];
    }

    const sortableFields = {
      createdAt: "createdAt",
      name: "name",
      preparationTime: "preparationTime",
      cookingTime: "cookingTime",
      totalTime: "totalTime",
    } as const;

    const orderBy: Prisma.RecipeOrderByWithRelationInput = filters.sort
      ? {
          [sortableFields[filters.sort]]: filters.order ?? "asc",
        }
      : {
          createdAt: "desc",
        };

    const skip = (filters.page - 1) * filters.limit;

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        orderBy,
        include: RECIPE_SUMMARY_INCLUDE,
        skip,
        take: filters.limit,
      }),

      prisma.recipe.count({
        where,
      }),
    ]);

    return {
      recipes: recipes.map(toSafeRecipeSummary),

      total,

      page: filters.page,

      limit: filters.limit,

      totalPages: Math.ceil(total / filters.limit),
    };
  },
};
