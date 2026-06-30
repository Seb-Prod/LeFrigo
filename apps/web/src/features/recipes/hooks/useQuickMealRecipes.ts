import { recipeService } from "../services/recipe.service";
import { useRecipes } from "./useRecipes";

export function useQuickMealRecipes(limit = 5, maxTotalTime = 30) {
  return useRecipes({
    fetcher: () => recipeService.getQuickMeal(limit, maxTotalTime),
    deps: [limit, maxTotalTime],
  });
}