import { SafeRecipe, SafeRecipeSummary } from "packages/shared/dist";

export function toSafeRecipe(recipe: any): SafeRecipe {
  return {
    id:              recipe.id,
    name:            recipe.name,
    description:     recipe.description ?? null,
    preparationTime: recipe.preparationTime ?? null,
    cookingTime:     recipe.cookingTime ?? null,
    servings:        recipe.servings ?? null,
    status:          recipe.status,
    createdAt:       recipe.createdAt.toISOString(),
    updatedAt:       recipe.updatedAt.toISOString(),
    user: {
      id:       recipe.user.id,
      userName: recipe.user.userName,
    },
    ingredients: recipe.ingredients.map((ri: any) => ({
      id:       ri.ingredient.id,
      name:     ri.ingredient.name,
      quantity: ri.quantity ?? null,
      unit:     ri.unit ?? null,
    })),
    steps: recipe.steps.map((s: any) => ({
      id:          s.id,
      position:    s.position,
      instruction: s.instruction,
    })),
  };
}

export function toSafeRecipeSummary(recipe: any): SafeRecipeSummary {
  return {
    id:              recipe.id,
    name:            recipe.name,
    description:     recipe.description ?? null,
    preparationTime: recipe.preparationTime ?? null,
    cookingTime:     recipe.cookingTime ?? null,
    servings:        recipe.servings ?? null,
    status:          recipe.status,
    createdAt:       recipe.createdAt.toISOString(),
    updatedAt:       recipe.updatedAt.toISOString(),
    user: {
      id:       recipe.user.id,
      userName: recipe.user.userName,
    },
  };
}