import { useEffect, useState } from "react";

import type { SafeRecipeSummary } from "@lefrigo/shared";

import { recipeService } from "../services/recipe.service";

/* ── Types ─────────────────────────────────────────────────── */

/** États possibles du chargement des recettes récentes */
type Status = "idle" | "loading" | "success" | "error";

/**
 * Charge les dernières recettes publiées.
 *
 * Le chargement est déclenché au montage du composant
 * puis à chaque modification de la limite demandée.
 *
 * @param limit Nombre maximal de recettes à récupérer.
 *
 * @returns Les recettes récentes ainsi que les états de chargement et d'erreur.
 */
export function useRecentRecipes(limit = 5) {
  const [status, setStatus] = useState<Status>("loading");
  const [recipes, setRecipes] = useState<SafeRecipeSummary[]>([]);

  /* ── Chargement des recettes ────────────────────────────── */

  useEffect(() => {
    let cancelled = false;

    /** Récupère les dernières recettes publiées */
    const fetch = async () => {
      setStatus("loading");

      try {
        const result = await recipeService.getRecent(limit);

        if (!cancelled) {
          setRecipes(result);
          setStatus("success");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    fetch();

    /* ── Nettoyage ────────────────────────────────────────── */

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return {
    recipes,
    loading: status === "loading",
    error: status === "error",
  };
}