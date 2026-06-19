import { request } from "@/lib/api/request";
import type {
  CreateRecipeDto,
  SafeRecipe,
  SafeRecipeSummary,
} from "@lefrigo/shared";

/* ── Types ─────────────────────────────────────────────────── */

export type PaginatedRecipes = {
  recipes: SafeRecipeSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type IngredientSuggestion = {
  id: string;
  name: string;
};

/* ── Service ────────────────────────────────────────────────── */

/**
 * Service front des recettes.
 *
 * Regroupe :
 * - `createRecipe`      → soumet la recette complète à l'API
 * - `updateRecipe`      → met à jour une recette existante
 * - `getById`           → recette complète par ID
 * - `getMyRecipes`      → liste paginée des recettes de l'utilisateur connecté
 * - `getMyCount`        → nombre de recettes de l'utilisateur connecté
 * - `getRecent`         → N dernières recettes publiées
 * - `getRandom`         → N recettes aléatoires publiées
 * - `searchIngredients` → autocomplete ingrédients
 */
export const recipeService = {
  /** Crée une recette complète — appelé à la soumission finale de l'étape 3. */
  createRecipe: (data: CreateRecipeDto) =>
    request<SafeRecipe>("/recipes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** Met à jour une recette existante par son ID. */
  updateRecipe: (recipeId: string, data: CreateRecipeDto) =>
    request<SafeRecipe>(`/recipes/${recipeId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  /** Retourne une recette complète par son ID. */
  getById: (recipeId: string) => request<SafeRecipe>(`/recipes/${recipeId}`),

  /** Retourne la liste paginée des recettes de l'utilisateur connecté. */
  getMyRecipes: (page = 1, limit = 10) =>
    request<PaginatedRecipes>(`/recipes/me?page=${page}&limit=${limit}`),

  /** Retourne le nombre de recettes de l'utilisateur connecté. */
  getMyCount: () => request<{ count: number }>("/recipes/me/count"),

  /** Retourne les N dernières recettes publiées. */
  getRecent: (limit?: number) =>
    request<SafeRecipeSummary[]>(
      `/recipes/recent${limit ? `?limit=${limit}` : ""}`,
    ),

  /** Retourne N recettes aléatoires publiées. */
  getRandom: (limit?: number) =>
    request<SafeRecipeSummary[]>(
      `/recipes/random${limit ? `?limit=${limit}` : ""}`,
    ),

  /** Recherche les ingrédients existants pour l'autocomplete. */
  searchIngredients: (query: string) =>
    request<IngredientSuggestion[]>(
      `/ingredients/search?q=${encodeURIComponent(query)}`,
    ),
};
