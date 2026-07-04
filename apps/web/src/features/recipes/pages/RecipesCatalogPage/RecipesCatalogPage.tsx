"use client";

import type { RecipeFilters } from "@lefrigo/shared";
import { useState } from "react";
import { useRecipes } from "../../hooks";
import { Pagination, Surface } from "@/components/ui";
import { RecipeGrid } from "../../components/RecipeGrid";
import { RecipeCatalogHeader } from "./components/RecipeCatalogHeader";
import { useDevice } from "@/contexts/device.context";

/* ── Types ─────────────────────────────────────────────────── */

type RecipesCatalogPageProps = {
  /** Filtres initiaux transmis depuis les search params de l'URL. */
  initialFilters?: RecipeFilters;
};

/** Clés de `RecipeFilters` pilotables via un input number de test. */
type NumericFilterKey = "maxPreparationTime" | "maxCookingTime" | "maxTotalTime";


/* ── Composant ─────────────────────────────────────────────── */

/**
 * Page catalogue des recettes.
 *
 * @remarks
 * Affiche pour l'instant les filtres reçus sous forme de texte brut,
 * en attendant le branchement réel sur `useRecipes` / `usePaginatedRecipes`.
 * Aucun filtre n'est appliqué visuellement à une liste : c'est un état
 * de debug/vérification, pas la version finale de la page.
 *
 * Les filtres actifs sont affichés sous forme de badges cliquables
 * (via `RecipeCatalogHeader`) : cliquer sur un badge retire le filtre
 * correspondant et réinitialise la pagination à la page 1.
 *
 * @example
 * <RecipesCatalogPage initialFilters={{ search: "curry", maxTotalTime: 30 }} />
 */
export function RecipesCatalogPage({
  initialFilters,
}: RecipesCatalogPageProps) {
  const { isPWA } = useDevice();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<RecipeFilters>(initialFilters ?? {});

  const { recipes, loading, total, error, totalPages } = useRecipes({
    page: page,
    ...filters,
  });

  /** Retire un filtre donné (clic sur son badge) et repart en page 1. */
  const handleRemoveFilter = (key: keyof RecipeFilters) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setPage(1);
  };

  /**
   * Met à jour un filtre numérique de test (`maxPreparationTime`,
   * `maxCookingTime` ou `maxTotalTime`) depuis son input dans le header.
   * Une valeur vide ou invalide retire le filtre plutôt que d'envoyer NaN.
   */
  const handleNumericFilterChange = (key: NumericFilterKey, value: string) => {
    const parsed = value === "" ? undefined : Number(value);

    setFilters((prev) => ({
      ...prev,
      [key]: parsed !== undefined && !Number.isNaN(parsed) ? parsed : undefined,
    }));
    setPage(1);
  };

  const catalogHeader = (
    <RecipeCatalogHeader
      filters={filters}
      onRemoveFilter={handleRemoveFilter}
      onNumericFilterChange={handleNumericFilterChange}
    />
  );

  return (
    <div>
      
      <Surface
        fullScreen
        replaceHeader
        headerContent={catalogHeader}
      >
        <RecipeGrid recipes={recipes} isLoading={loading} hasError={error} />

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </Surface>
    </div>
  );
}