"use client";

import { RecipeForm, RecipeList, useRecipes } from "@/features/recipes";

export default function RecipesPage() {
  const { recipes, createRecipe, deleteRecipe } = useRecipes();

  return (
    <>
      <h1>Mes recettes</h1>

      <RecipeForm onSubmit={createRecipe} />
      <RecipeList recipes={recipes} onDelete={deleteRecipe} />
    </>
  );
}
