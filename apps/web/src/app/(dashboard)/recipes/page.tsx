"use client";

import { RecipeForm, RecipeList, useRecipes } from "@/features/recipes";
import styles from "./recipes.module.css";

export default function RecipesPage() {
  const { recipes, createRecipe, deleteRecipe } = useRecipes();

  return (
    <>
      <h1 className={styles.title}>Mes recettes</h1>

      <RecipeForm onSubmit={createRecipe} />
      <RecipeList recipes={recipes} onDelete={deleteRecipe} />
    </>
  );
}
