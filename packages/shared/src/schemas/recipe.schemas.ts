import { z } from "zod";

/* ── Sous-schémas ──────────────────────────────────────────── */

export const recipeIngredientSchema = z.object({
  name:     z.string().min(1, "Le nom de l'ingrédient est requis."),
  quantity: z.number().positive("La quantité doit être positive.").optional(),
  unit:     z.string().max(20).optional(),
});

export const recipeStepSchema = z.object({
  position:    z.number().int().positive(),
  instruction: z.string().min(1, "L'instruction est requise."),
});

/* ── Schémas par étape ─────────────────────────────────────── */

/** Étape 1 — Informations générales */
export const recipeInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom est trop court.")
    .max(100, "Le nom est trop long."),

  description:     z.string().max(1000).optional(),
  preparationTime: z.number().int().nonnegative().optional(),
  cookingTime:     z.number().int().nonnegative().optional(),
  servings:        z.number().int().positive().optional(),
});

/** Étape 2 — Ingrédients */
export const recipeIngredientsSchema = z.object({
  ingredients: z
    .array(recipeIngredientSchema)
    .min(1, "Au moins un ingrédient est requis."),
});

/** Étape 3 — Étapes de préparation */
export const recipeStepsSchema = z.object({
  steps: z
    .array(recipeStepSchema)
    .min(1, "Au moins une étape est requise."),
});

/* ── Schéma final (fusion des 3 étapes) ───────────────────── */

export const createRecipeSchema = recipeInfoSchema
  .extend(recipeIngredientsSchema.shape)
  .extend(recipeStepsSchema.shape);

/* ── Types ─────────────────────────────────────────────────── */

export type RecipeIngredientDto = z.infer<typeof recipeIngredientSchema>;
export type RecipeStepDto       = z.infer<typeof recipeStepSchema>;
export type RecipeInfoDto       = z.infer<typeof recipeInfoSchema>;
export type RecipeIngredientsDto = z.infer<typeof recipeIngredientsSchema>;
export type RecipeStepsDto      = z.infer<typeof recipeStepsSchema>;
export type CreateRecipeDto     = z.infer<typeof createRecipeSchema>;