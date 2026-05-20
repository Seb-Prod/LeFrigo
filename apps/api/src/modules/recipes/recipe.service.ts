import { AppError } from "../../core/errors/AppError";
import { recipeRepository } from "./recipe.repository";

export const recipeService = {
  getAll(userId: string) {
    return recipeRepository.findAllByUser(userId);
  },

  create(name: string, userId: string) {
    return recipeRepository.create(name, userId);
  },

  async delete(
    id: string,

    userId: string,
  ) {
    const recipe = await recipeRepository.findById(id);

    if (!recipe) {
      throw new AppError(
        404,
        "Recette introuvable",
      );
    }

    if (recipe.userId !== userId) {
      throw new AppError(
        403,
        "Accès interdit",
      );
    }

    await recipeRepository.delete(id);
  },
};
