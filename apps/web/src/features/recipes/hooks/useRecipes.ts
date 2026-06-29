import { useEffect, useState } from "react";
import type { SafeRecipeSummary } from "@lefrigo/shared";

/* ── Types ─────────────────────────────────────────────────── */

type Status = "idle" | "loading" | "success" | "error";

type UseRecipesOptions = {
  /** Fonction async qui retourne la liste de recettes — appelée au montage. */
  fetcher: () => Promise<SafeRecipeSummary[]>;
  /** Dépendances déclenchant un rechargement (ex. limit, maxPrepTime). */
  deps?: unknown[];
};

/**
 * Hook générique de chargement de recettes.
 *
 * Gère le cycle complet : loading → success | error,
 * avec annulation automatique si le composant est démonté.
 *
 * @example
 * // Hook spécifique construit par-dessus
 * export function useRecentRecipes(limit = 5) {
 *   return useRecipes({
 *     fetcher: () => recipeService.getRecent(limit),
 *     deps: [limit],
 *   });
 * }
 */
export function useRecipes({ fetcher, deps = [] }: UseRecipesOptions) {
  const [status, setStatus] = useState<Status>("loading");
  const [recipes, setRecipes] = useState<SafeRecipeSummary[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setStatus("loading");
      try {
        const result = await fetcher();
        if (!cancelled) {
          setRecipes(result);
          setStatus("success");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    load();

    return () => {
      cancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    recipes,
    loading: status === "loading",
    error: status === "error",
  };
}