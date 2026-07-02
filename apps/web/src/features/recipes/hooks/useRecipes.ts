import { useCallback, useEffect, useMemo, useState } from "react";
import type { RecipeFilters } from "@lefrigo/shared";
import {
  recipeService,
  type PaginatedRecipes,
} from "../services/recipe.service";

/* ── Types ───────────────────────────────────────────────── */

/**
 * Résultat associé à une clé de filtres donnée, pour pouvoir
 * dériver l'état "loading" sans jamais avoir à le setState
 * de façon synchrone dans l'effet.
 */
type Result = {
  key: string;
  status: "success" | "error";
  data: PaginatedRecipes | null;
};

/* ── Hook ────────────────────────────────────────────────── */

/**
 * Charge une liste paginée de recettes en fonction des filtres.
 *
 * Les données sont automatiquement rechargées lorsque les filtres changent.
 */
export function useRecipes(filters: RecipeFilters = {}) {
  const [result, setResult] = useState<Result>({
    key: "",
    status: "success",
    data: null,
  });

  /**
   * Clé stable représentant les filtres par valeur (et non par référence),
   * pour éviter un rechargement à chaque render si l'appelant recrée
   * l'objet `filters` sans en changer le contenu.
   */
  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);

  /**
   * Référence stable de `filters`, mémoïsée sur `filtersKey`.
   * Nécessaire pour satisfaire exhaustive-deps sur `load` tout en
   * conservant une comparaison par valeur plutôt que par référence.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableFilters = useMemo(() => filters, [filtersKey]);

  /**
   * Recharge les recettes.
   *
   * Aucun `setState` synchrone en tête de fonction : le résultat n'est
   * écrit qu'après l'`await`, ce qui évite les rendus en cascade.
   * L'état "loading" n'est jamais setState explicitement — il est dérivé
   * plus bas en comparant `filtersKey` à la clé du dernier résultat reçu.
   */
  const load = useCallback(async () => {
    try {
      const data = await recipeService.find(stableFilters);
      setResult({ key: filtersKey, status: "success", data });
    } catch {
      setResult({ key: filtersKey, status: "error", data: null });
    }
  }, [stableFilters, filtersKey]);

  /**
   * Chargement automatique lors d'un changement de filtres.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  /**
   * "En cours de chargement" tant que le dernier résultat reçu ne
   * correspond pas aux filtres actuels.
   */
  const loading = result.key !== filtersKey;

  return {
    recipes: result.data?.recipes ?? [],
    total: result.data?.total ?? 0,
    totalPages: result.data?.totalPages ?? 0,
    page: result.data?.page ?? filters.page ?? 1,

    loading,
    error: result.status === "error" && !loading,

    refresh: load,
  };
}