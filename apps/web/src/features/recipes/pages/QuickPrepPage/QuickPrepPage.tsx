"use client";

import { useState } from "react";
import { Pagination, Surface } from "@/components/ui";
import { useRecipes } from "../../hooks";
import { RecipeGrid } from "../../components/RecipeGrid";

export function QuickPrepPage() {
  /* ── État pagination ──────────────────────────────────── */

  const [page, setPage] = useState(1);

  const { recipes, loading, error, totalPages } = useRecipes({
    page:page,
    maxPreparationTime: 10,
    limit: 20,
  });

  return (
    <Surface titleSize="sm" subtitle="Préparation" fullScreen>
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
  );
}
