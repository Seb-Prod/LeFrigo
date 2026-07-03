"use client";

import type { RecipeFilters } from "@lefrigo/shared";
import { useState } from "react";
import { useRecipes } from "../../hooks";
import { Pagination, Surface } from "@/components/ui";
import { RecipeGrid } from "../../components/RecipeGrid";
import { RecipeCatalogHeader } from "./components/RecipeCatalogHeader";

/* ── Types ─────────────────────────────────────────────────── */

type RecipesCatalogPageProps = {
  /** Filtres initiaux transmis depuis les search params de l'URL. */
  initialFilters?: RecipeFilters;
};

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
 * @example
 * <RecipesCatalogPage initialFilters={{ search: "curry", maxTotalTime: 30 }} />
 */
export function RecipesCatalogPage({
  initialFilters,
}: RecipesCatalogPageProps) {
  /** Liste des entrées de filtres définies (on ignore les clés `undefined`). */
  const activeFilters = initialFilters
    ? Object.entries(initialFilters).filter(([, value]) => value !== undefined)
    : [];

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<RecipeFilters>(initialFilters ?? {});

  const { recipes, loading, total, error, totalPages } = useRecipes({
    page: page,
    ...filters,
  });

  return (
    <>
      <span>{total}</span>
      <Surface
        fullScreen
        replaceHeader
        headerContent={<RecipeCatalogHeader initialFilters={initialFilters}/>}
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
    </>
  );
}
