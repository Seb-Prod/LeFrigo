import { useEffect, useState } from "react";
import { recipeService } from "../services/recipe.service";
import type { SafeRecipeSummary } from "@lefrigo/shared";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Charge les N dernières recettes publiées.
 * Déclenché une seule fois au montage.
 */
export function useRecentRecipes(limit = 5) {
  const [status, setStatus] = useState<Status>("loading");
  const [recipes, setRecipes] = useState<SafeRecipeSummary[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setStatus("loading");
      try {
        const result = await recipeService.getRecent(limit);
        if (!cancelled) {
          setRecipes(result);
          setStatus("success");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [limit]);

  return {
    recipes,
    loading: status === "loading",
    error:   status === "error",
  };
}