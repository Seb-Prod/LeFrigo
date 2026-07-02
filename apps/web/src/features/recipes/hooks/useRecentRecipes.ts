import { recipeService } from "../services/recipe.service";
import { usePaginatedRecipes } from "./usePaginatedRecipes";

export function useRecentRecipes(limit = 10) {
  return usePaginatedRecipes({
    fetcher: () =>
      recipeService.find({
        sort: "createdAt",
        order: "desc",
        limit: limit,
      }),
    deps: [limit],
  });
}
