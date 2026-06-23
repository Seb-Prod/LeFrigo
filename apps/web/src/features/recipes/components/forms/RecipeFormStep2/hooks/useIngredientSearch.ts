import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  recipeService,
  IngredientSuggestion,
} from "@/features/recipes/services/recipe.service";

/**
 * Gère la recherche d'ingrédients avec debounce et annulation de requête.
 *
 * Retourne :
 * - `query` / `setQuery` — valeur du champ de recherche
 * - `suggestions`        — résultats courants
 * - `searching`          — indicateur de chargement
 * - `clearSuggestions`   — vide la liste sans toucher à `query`
 */
export function useIngredientSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<IngredientSuggestion[]>([]);
  const [searching, setSearching] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    let cancelled = false;

    const search = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setSearching(true);
      try {
        const results = await recipeService.searchIngredients(debouncedQuery);
        if (!cancelled) setSuggestions(results);
      } catch {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    };

    search();
    return () => { cancelled = true; };
  }, [debouncedQuery]);

  /** Réinitialise query + suggestions après une sélection */
  const clearSuggestions = () => {
    setQuery("");
    setSuggestions([]);
  };

  return { query, setQuery, suggestions, searching, clearSuggestions };
}