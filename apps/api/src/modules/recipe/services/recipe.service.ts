import { AppError } from "../../../core/errors/AppError";
import type { CreateRecipeDto } from "@lefrigo/shared";
import { userRepository } from "../../users/user.repository";
import { recipeRepository } from "../repositories";

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
};
