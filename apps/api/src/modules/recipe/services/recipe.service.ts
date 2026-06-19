import { AppError } from "../../../core/errors/AppError";
import type { CreateRecipeDto } from "@lefrigo/shared";
import { userRepository } from "../../users/user.repository";
import { recipeRepository } from "../repositories";
import { recipeQueryRepository } from "../repositories/recipe.query.repository";

export const recipeService = {
  /**
   * Crée une recette pour un utilisateur connecté.
   *
   * - Vérifie que l'utilisateur existe et est actif.
   * - Délègue la persistance au repository (transaction atomique).
   *
   * @param userId - ID de l'utilisateur connecté (depuis le JWT).
   * @param data   - Données validées par `createRecipeSchema`.
   * @returns La recette créée avec ses étapes et ingrédients.
   * @throws {AppError} 404 `USER_NOT_FOUND` si l'utilisateur n'existe pas.
   * @throws {AppError} 403 `ACCOUNT_INACTIVE` si le compte n'est pas actif.
   */
  create: async (userId: string, data: CreateRecipeDto) => {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND");
    }

    if (user.status !== "ACTIVE") {
      throw new AppError(403, "ACCOUNT_INACTIVE");
    }

    return recipeRepository.create(userId, data);
  },

  update: async (recipeId: string, userId: string, data: CreateRecipeDto) => {
    const recipe = await recipeQueryRepository.findById(recipeId);

    if (!recipe) {
      throw new AppError(404, "RECIPE_NOT_FOUND");
    }

    if (recipe.user.id !== userId) {
      throw new AppError(403, "FORBIDDEN");
    }
    return recipeRepository.update(recipeId, data);
  },

  getById: async (recipeId: string) => {
    const recipe = await recipeQueryRepository.findById(recipeId);

    if (!recipe) {
      throw new AppError(404, "RECIPE_NOT_FOUND");
    }

    return recipe;
  },

  getUserRecipes: async (userId: string, page = 1, limit = 10) => {
    const [recipes, total] = await Promise.all([
      recipeQueryRepository.findByUser(userId, page, limit),
      recipeQueryRepository.countByUser(userId),
    ]);

    return {
      recipes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  /** Retourne uniquement le nombre de recettes de l'utilisateur. */
  getUserRecipeCount: (userId: string) =>
    recipeQueryRepository.countByUser(userId),

  /** Retourne les N dernières recettes publiées tous utilisateurs confondus. */
  getRecentRecipes: (limit?: number) =>
    recipeQueryRepository.findRecent(limit),

  /** Retourne N recettes aléatoires publiées. */
  getRandomRecipes: (limit?: number) =>
    recipeQueryRepository.findRandom(limit),
};
