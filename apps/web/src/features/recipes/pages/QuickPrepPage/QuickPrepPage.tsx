"use client";

import { useState } from "react";
import { Surface } from "@/components/ui";
import { RecipeGrid } from "../../components/RecipeGrid";
import { Pagination } from "../../components/Pagination";
import { useQuickPrepRecipesPaginated } from "../../hooks/useQuickPrepRecipesPaginated";

export function QuickPrepPage() {
  /* ── État pagination ──────────────────────────────────── */

  const [page, setPage] = useState(1);

  const { recipes, loading, error, totalPages } =
    useQuickPrepRecipesPaginated(page, 30, 10);

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