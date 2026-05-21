import { MealPlan } from "@shared/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const mealPlanService = {
  async getAll(token: string): Promise<MealPlan[]> {
    const response = await fetch(`${API_URL}/meal-plans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de charger le planning");
    }

    return response.json();
  },

  async create(
    data: {
      date: string;
      mealType: "LUNCH" | "DINNER";
      recipeId: string;
    },
    token: string,
  ) {
    const response = await fetch(`${API_URL}/meal-plans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Impossible de créer le repas");
    }

    return response.json();
  },
};
