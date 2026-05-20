"use client";

import { useEffect, useState } from "react";

import { Recipe } from "@shared/types/recipe.types";

import RecipeCard from "@/features/recipes/components/RecipeCard/RecipeCard";
import styles from "./recipes.module.css";
import { Button, Input } from "@/components/ui";
import { recipeService } from "@/features/recipes/services/recipe.service";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [name, setName] = useState("");

  useEffect(() => {
    loadRecipes();
  }, []);

  async function loadRecipes() {
    const token = localStorage.getItem("token");

    if (!token) return;

    const data = await recipeService.getAll(token);

    setRecipes(data);
  }

  async function handleCreate() {
    const token = localStorage.getItem("token");

    if (!token || !name.trim()) {
      return;
    }

    await recipeService.create(name, token);

    setName("");

    loadRecipes();
  }

  async function handleDelete(id: string) {
    const token = localStorage.getItem("token");

    if (!token) return;

    await recipeService.delete(id, token);

    await loadRecipes();
  }

  return (
    <>
      <h1>Recettes</h1>

      <div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom recette"
        />

        <Button onClick={handleCreate}>Ajouter</Button>
      </div>

      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}
