"use client";

import { RecipeSection } from "@/features/recipes/components/RecipeSection";
import { useRecipes } from "@/features/recipes/hooks";

/**
 * Section "Prêt en 30 minutes" — recettes dont la somme
 * préparation + cuisson est inférieure ou égale à 30 minutes.
 *
 * @remarks
 * Utilise temporairement `useRecentRecipes(10)` en attendant la route
 * `GET /recipes?maxTotalTime=30`. Remplacer par `useQuickMealRecipes`
 * quand disponible.
 */
export function QuickMealSection() {
  const { recipes, loading, error } = useRecipes({
    maxTotalTime: 30,
    limit: 10,
  });

  return (
    <RecipeSection
      title="Prêt en 30 minutes"
      subtitle="Des recettes complètes prêtes en une demi-heure ou moins"
      seeAllHref=""
      recipes={recipes}
      isLoading={loading}
      hasError={error}
    />
  );
}
