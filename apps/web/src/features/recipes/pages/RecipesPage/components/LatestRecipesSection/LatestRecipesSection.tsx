"use client";

import { RecipeSection } from "@/features/recipes/components/RecipeSection";
import { useRecipes } from "@/features/recipes/hooks";

/**
 * Section "Dernières recettes ajoutées" — affiche les recettes
 * les plus récentes de la plateforme, triées par date de création.
 */
export function LatestRecipesSection() {
  const { recipes, loading, error } = useRecipes({
    sort: "createdAt",
    order: "desc",
    limit: 10,
  });

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
