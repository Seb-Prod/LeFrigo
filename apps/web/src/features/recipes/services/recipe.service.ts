import { request } from "@/lib/api/request";
import type { CreateRecipeDto } from "@lefrigo/shared";

/* ── Types ─────────────────────────────────────────────────── */

export type IngredientSuggestion = {
  id:   string;
  name: string;
};

/* ── Service ────────────────────────────────────────────────── */

/**
 * Service front des recettes.
 *
 * Regroupe :
 * - `createRecipe`      → soumet la recette complète à l'API
 * - `searchIngredients` → recherche les ingrédients existants pour l'autocomplete
 */
export const recipeService = {
  /** Crée une recette complète — appelé à la soumission finale de l'étape 3. */
  createRecipe: (data: CreateRecipeDto) =>
    request<void>("/recipes", {
      method: "POST",
      body:   JSON.stringify(data),
    }),

  /** Recherche les ingrédients dont le nom contient `query` (min. 1 caractère). */
  searchIngredients: (query: string) =>
    request<IngredientSuggestion[]>(
      `/recipes/ingredients/search?q=${encodeURIComponent(query)}`,
    ),
};