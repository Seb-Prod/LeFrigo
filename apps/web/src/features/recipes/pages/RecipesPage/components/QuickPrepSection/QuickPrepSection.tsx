"use client";

import { RecipeSection } from "@/features/recipes/components/RecipeSection";
import { useQuickPrepRecipes } from "@/features/recipes/hooks";

/**
 * Section "Pas le courage de cuisiner" — recettes à préparation
 * minimale pour les soirs sans motivation.
 */
export function QuickPrepSection() {
  const { recipes, loading, error } = useQuickPrepRecipes(10,10);

  return (
    <RecipeSection
      title="Pas le courage de cuisiner"
      subtitle="Quand la motivation manque, mais pas l'appétit."
      seeAllHref="/recipes/quick-prep"
      recipes={recipes}
      isLoading={loading}
      hasError={error}
    />
  );
}