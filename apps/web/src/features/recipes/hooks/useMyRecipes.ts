import { useEffect, useState } from "react";
import { recipeService, PaginatedRecipes } from "../services/recipe.service";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Charge la liste paginée des recettes de l'utilisateur connecté.
 *
 * - Recharge automatiquement quand `page` change.
 * - Expose `goToPage` pour la navigation entre pages.
 */
export function useMyRecipes(initialPage = 1, limit = 10) {
  const [status, setStatus]   = useState<Status>("loading");
  const [page, setPage]       = useState(initialPage);
  const [data, setData]       = useState<PaginatedRecipes | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setStatus("loading");
      try {
        const result = await recipeService.getMyRecipes(page, limit);
        if (!cancelled) {
          setData(result);
          setStatus("success");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [page, limit]);

  return {
    recipes:    data?.recipes    ?? [],
    total:      data?.total      ?? 0,
    totalPages: data?.totalPages ?? 1,
    page,
    loading:    status === "loading",
    error:      status === "error",
    goToPage:   setPage,
  };
}