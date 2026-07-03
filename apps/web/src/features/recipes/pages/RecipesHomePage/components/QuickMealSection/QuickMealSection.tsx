"use client";

import { RecipeSection } from "@/features/recipes/components/RecipeSection";
import { useRecipes } from "@/features/recipes/hooks";

/* ── Constantes ────────────────────────────────────────────── */

/** Seuil de temps total (minutes) pour la section "Prêt en 30 minutes". */
const MAX_TOTAL_TIME = 30;

/**
 * Section "Prêt en 30 minutes" — recettes dont le temps total
 * (préparation + cuisson) est inférieur ou égal à 30 minutes.
 *
 * @remarks
 * Le lien "Voir plus" mène au catalogue (`/recipes?view=catalog`) avec
 * le même filtre `maxTotalTime`, pour que la liste complète corresponde
 * exactement aux recettes teasées dans la section.
 */
export function QuickMealSection() {
  const { recipes, loading, error } = useRecipes({
    maxTotalTime: MAX_TOTAL_TIME,
    limit: 10,
  });

  return (
    <RecipeSection
      title="Prêt en 30 minutes"
      subtitle="Des recettes complètes prêtes en une demi-heure ou moins"
      seeAllHref={`/recipes?view=catalog&maxTotalTime=${MAX_TOTAL_TIME}&maxPreparationTime=10`}
      recipes={recipes}
      isLoading={loading}
      hasError={error}
    />
  );
}