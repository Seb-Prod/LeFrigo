import { AppError } from "../../core/errors/AppError";
import { userRepository } from "../users/user.repository";
import { recipeRepository } from "./recipe.repository";
import type { CreateRecipeDto } from "@lefrigo/shared";

/**
 * Service métier des recettes.
 *
 * Regroupe :
 * - `createRecipe`       → valide le contexte utilisateur et crée la recette
 * - `searchIngredients`  → délègue la recherche au repository pour l'autocomplete
 */
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
  createRecipe: async (userId: string, data: CreateRecipeDto) => {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND");
    }

    if (user.status !== "ACTIVE") {
      throw new AppError(403, "ACCOUNT_INACTIVE");
    }

    return recipeRepository.create(userId, data);
  },

  /**
   * Recherche les ingrédients existants pour l'autocomplete.
   *
   * - Rejette les queries trop courtes pour éviter les recherches inutiles.
   *
   * @param query - Chaîne de recherche (min. 1 caractère).
   * @returns Liste d'ingrédients correspondants (max. 10).
   * @throws {AppError} 400 `QUERY_TOO_SHORT` si la query est vide.
   */
  searchIngredients: async (query: string) => {
    if (!query?.trim()) {
      throw new AppError(400, "QUERY_TOO_SHORT");
    }

    return recipeRepository.searchIngredients(query.trim());
  },
};