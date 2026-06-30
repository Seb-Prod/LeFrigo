import { recipeService } from "../services/recipe.service";
import { usePaginatedRecipes } from "./usePaginatedRecipes";

export function useQuickPrepRecipesPaginated(page = 1, limit = 10, maxPrepTime = 10) {
  return usePaginatedRecipes({
    fetcher: () => recipeService.getQuickPrep(page, limit, maxPrepTime),
    deps: [page, limit, maxPrepTime],
  });
}