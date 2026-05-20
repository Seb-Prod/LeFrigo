import { Recipe } from "@shared/types/recipe.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const recipeService = {
  async getAll(token: string): Promise<Recipe[]> {
    const response = await fetch(`${API_URL}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de charger les recettes");
    }

    return response.json();
  },

  async create(name: string, token: string): Promise<Recipe> {
    const response = await fetch(`${API_URL}/recipes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      throw new Error("Impossible de créer la recette");
    }

    return response.json();
  },

  async delete(id: string, token: string):Promise<void> {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de supprimer la recette");
    }
  },
};
