import { useEffect, useState } from "react";

import type { SafeRecipeSummary } from "@lefrigo/shared";

import { recipeService } from "../services/recipe.service";

/* ── Types ─────────────────────────────────────────────────── */

/** États possibles du chargement des recettes aléatoires */
type Status = "idle" | "loading" | "success" | "error";

/**
 * Charge des recettes aléatoirement.
 *
 * Le chargement est déclenché au montage du composant
 * puis à chaque modification de la limite demandée.
 *
 * @param limit Nombre maximal de recettes à récupérer.
 *
 * @returns Les recettes aléatoire ainsi que les états de chargement et d'erreur.
 */
export function useRandomRecipes(limit = 5) {
  const [status, setStatus] = useState<Status>("loading");
  const [recipes, setRecipes] = useState<SafeRecipeSummary[]>([]);

  /* ── Chargement des recettes ────────────────────────────── */

  useEffect(() => {
    let cancelled = false;

    /** Récupère des recettes aléatoirement */
    const fetch = async () => {
      setStatus("loading");

      try {
        const result = await recipeService.getRandom(limit);

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