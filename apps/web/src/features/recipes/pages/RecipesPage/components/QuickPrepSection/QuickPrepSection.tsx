"use client";

import { useRecentRecipes } from "@/features/recipes/hooks/useRecentRecipes";
import { RecipeSection } from "@/features/recipes/components/RecipeSection";

/**
 * Section "Pas le courage de cuisiner" — recettes à préparation
 * minimale pour les soirs sans motivation.
 *
 * @remarks
 * Utilise temporairement `useRecentRecipes(10)` en attendant la route
 * `GET /recipes?maxPrepTime=10`. Remplacer par `useQuickPrepRecipes`
 * quand disponible.
 */
export function QuickPrepSection() {
  const { recipes, loading, error } = useRecentRecipes(10);

  return (
    <RecipeSection
      title="Pas le courage de cuisiner"
      subtitle="Quand la motivation manque, mais pas l'appétit."
      seeAllHref=""
      recipes={recipes}
      isLoading={loading}
      hasError={error}
    />
  );
}