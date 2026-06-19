import { prisma } from "../../../lib/prisma";
import { CreateRecipeDto } from "packages/shared/dist";
import { toSafeRecipe } from "../recipe.seralizer";
import { RECIPE_FULL_INCLUDE } from "./recipe.constants";
import { attachIngredients, createSteps } from "../helpers";

export const recipeRepository = {
  create: (userId: string, data: CreateRecipeDto) =>
    prisma.$transaction(async (tx) => {
      /**
       * Crée une recette complète avec ses étapes et ingrédients en une transaction.
       * Les ingrédients sont créés à la volée s'ils n'existent pas encore.
       */
      const recipe = await tx.recipe.create({
        data: {
          userId,
          name: data.name,
          description: data.description,
          preparationTime: data.preparationTime,
          cookingTime: data.cookingTime,
          servings: data.servings,
          status: "PUBLISHED",
        },
      });

      /** Création des étapes ordonnées */
      await createSteps(tx, recipe.id, data.steps);

      /** Résolution et liaison des ingrédients */
      await attachIngredients(tx, recipe.id, data.ingredients);

      /** Retourne la recette complète avec ses relations */
      return tx.recipe.findUniqueOrThrow({
        where: { id: recipe.id },
        include: {
          steps: { orderBy: { position: "asc" } },
          ingredients: { include: { ingredient: true } },
        },
      });
    }),

  /** Met à jour une recette existante.
   * Supprime et recrée les steps et ingrédients pour simplifier la logique de diff.
   */
  update: async (recipeId: string, data: CreateRecipeDto) => {
    const recipe = await prisma.$transaction(async (tx) => {
      await tx.recipe.update({
        where: { id: recipeId },
        data: {
          name: data.name,
          description: data.description,
          preparationTime: data.preparationTime,
          cookingTime: data.cookingTime,
          servings: data.servings,
        },
      });

      /** Suppression et recréation des steps */
      await tx.recipeStep.deleteMany({ where: { recipeId } });
      await createSteps(tx, recipe.id, data.steps);

      /** Suppresion et recréation des ingrédients */
      await tx.recipeIngredient.deleteMany({ where: { recipeId } });
      await attachIngredients(tx, recipe.id, data.ingredients);

      return tx.recipe.findFirstOrThrow({
        where: { id: recipeId },
        include: RECIPE_FULL_INCLUDE,
      });
    });

    return toSafeRecipe(recipe);
  },
  delete() {},
};
