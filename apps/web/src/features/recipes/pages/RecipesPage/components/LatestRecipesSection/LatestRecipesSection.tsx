"use client";

import { useRecentRecipes } from "@/features/recipes/hooks/useRecentRecipes";
import { RecipeSection } from "@/features/recipes/components/RecipeSection";

/**
 * Section "Dernières recettes ajoutées" — affiche les recettes
 * les plus récentes de la plateforme, triées par date de création.
 */
export function LatestRecipesSection() {
  const { recipes, loading, error } = useRecentRecipes(10);

  return (
    <RecipeSection
      title="Fraîchement ajoutées"
      subtitle="Découvrez les recettes les plus récentes"
      seeAllHref=""
      recipes={recipes}
      isLoading={loading}
      hasError={error}
    />
  );
}
