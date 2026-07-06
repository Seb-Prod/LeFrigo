"use client";

import { RecipeSection } from "@/features/recipes/components/RecipeSection";
import { useRecipes } from "@/features/recipes/hooks";

/**
 * Section "Pas le courage de cuisiner" — recettes à préparation
 * minimale pour les soirs sans motivation.
 */
export function QuickPrepSection() {
  const { recipes, loading, error } = useRecipes({
      maxPreparationTime: 10,
      limit: 10,
    });

  return (
    <RecipeSection
      title="Pas le courage de cuisiner"
      subtitle="Quand la motivation manque, mais pas l'appétit."
      seeAllHref={`/recipes?view=catalog&maxPreparationTime=10&maxCookingTime=10&search=Doux`}
      recipes={recipes}
      isLoading={loading}
      hasError={error}
    />
  );
}