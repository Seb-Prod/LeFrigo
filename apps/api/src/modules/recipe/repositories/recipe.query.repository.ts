import { prisma } from "../../../lib/prisma";
import { toSafeRecipe, toSafeRecipeSummary } from "../recipe.seralizer";
import {
  RECIPE_FULL_INCLUDE,
  RECIPE_SUMMARY_INCLUDE,
} from "./recipe.constants";
import { config } from "../../../core/config/";

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
    limit = config.recipes.quickPrepLimit,
    maxPrepTime = config.recipes.quickPrepMaxTime,
  ) => {
    const recipes = await prisma.recipe.findMany({
      where: {
        status: "PUBLISHED",
        deletedAt: null,
        preparationTime: { lte: maxPrepTime },
      },
      include: RECIPE_SUMMARY_INCLUDE,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return recipes.map(toSafeRecipeSummary);
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
        // Prisma ne peut pas additionner deux colonnes dans un where —
        // on filtre large côté DB puis on affine en mémoire
        preparationTime: { lte: maxTotalTime },
        cookingTime: { lte: maxTotalTime },
      },
      include: RECIPE_SUMMARY_INCLUDE,
      take: limit * 3, // marge pour compenser le filtre mémoire
    });

    return recipes
      .filter(
        (r) => (r.preparationTime ?? 0) + (r.cookingTime ?? 0) <= maxTotalTime,
      )
      .slice(0, limit)
      .map(toSafeRecipeSummary);
  },
};
