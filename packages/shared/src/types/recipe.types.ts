export type RecipeIngredientItem = {
  id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
};

export type RecipeStepItem = {
  id: string;
  position: number;
  instruction: string;
};

export type SafeRecipe = {
  id: string;
  name: string;
  description: string | null;
  preparationTime: number | null;
  cookingTime: number | null;
  servings: number | null;
  imageUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    userName: string;
  };
  ingredients: RecipeIngredientItem[];
  steps: RecipeStepItem[];
};

/** Version allégée pour les listes — sans steps ni ingrédients */
export type SafeRecipeSummary = Omit<SafeRecipe, "ingredients" | "steps">;
