import { recipeService } from "../services/recipe.service";
import { useRecipes } from "./useRecipes";

export function useQuickPrepRecipes(limit = 5, maxPrepTime = 10) {
  return useRecipes({
    fetcher: () => recipeService.getQuickPrep(limit, maxPrepTime),
    deps: [limit, maxPrepTime],
  });
}