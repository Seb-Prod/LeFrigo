"use client";

import { RecipeSection } from "@/features/recipes/components/RecipeSection";
import { useRandomRecipes } from "@/features/recipes/hooks/useRandomRecipes";

/**
 * Section "Découverte du moment" — sélection aléatoire de recettes
 * pour pousser l'utilisateur hors de ses habitudes.
 *
 */
export function DiscoverSection() {
  const { recipes, loading, error } = useRandomRecipes(10);

  return (
    <RecipeSection
      title="Découverte du moment"
      subtitle="Une sélection pour sortir de vos habitudes"
      seeAllHref=""
      recipes={recipes}
      isLoading={loading}
      hasError={error}
    />
  );
}