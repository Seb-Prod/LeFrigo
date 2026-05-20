"use client";

import { useAuth } from "@/contexts/auth.context";
import { Recipe } from "@shared/types/recipe.types";
import { startTransition, useCallback, useEffect, useState } from "react";
import { recipeService } from "../services/recipe.service";

/**
 * Hook pour gérer les recettes de l'utilisateur connecté.
 *
 * - Charge automatiquement les recettes au montage et quand le token change.
 * - Expose des actions optimistes : la liste est mise à jour immédiatement
 *   sans attendre un refetch.
 * - Un flag `cancelled` évite les race conditions si le token change
 *   pendant un fetch en cours.
 */
export function useRecipes() {
  const { token } = useAuth();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    startTransition(() => setLoading(true));
    recipeService.getAll(token).then((data) => {
      if (!cancelled) {
        setRecipes(data);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [token]);

  /** Recharge les recettes depuis l'API. */
  const fetchRecipes = useCallback(async () => {
    if (!token) return;
    const data = await recipeService.getAll(token);
    setRecipes(data);
  }, [token]);

  /**
   * Crée une recette et l'ajoute en tête de liste de manière optimiste.
   * Re-throw l'erreur pour que le composant appelant puisse réagir.
   */
  const createRecipe = async (name: string) => {
    if (!token) return;
    try {
      const recipe = await recipeService.create(name, token);
      setRecipes((current) => [recipe, ...current]);
    } catch (error) {
      console.error("Erreur création recette:", error);
      throw error;
    }
  };

  /**
   * Supprime une recette et la retire de la liste de manière optimiste.
   */
  const deleteRecipe = async (id: string) => {
    if (!token) return;
    await recipeService.delete(id, token);
    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
  };

  return {
    recipes,
    loading,
    createRecipe,
    deleteRecipe,
    refresh: fetchRecipes,
  };
}