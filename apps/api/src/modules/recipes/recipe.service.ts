import { recipeRepository } from "./recipe.repository";

export const recipeService = {
  getAll(userId: string) {
    return recipeRepository.findAllByUser(userId);
  },

  create(name: string, userId: string) {
    return recipeRepository.create(name, userId);
  },

  delete(id: string) {
    return recipeRepository.delete(id);
  },
};
