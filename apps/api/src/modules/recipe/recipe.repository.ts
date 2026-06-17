import { prisma } from "../../lib/prisma";
import type { CreateRecipeDto } from "@lefrigo/shared";

/**
 * Accès aux données des recettes et ingrédients.
 *
 * Regroupe :
 * - `create`                → crée une recette avec ses étapes et ingrédients
 * - `searchIngredients`     → recherche les ingrédients existants par nom
 * - `findOrCreateIngredient`→ retourne un ingrédient existant ou le crée
 */
export const recipeRepository = {
  /**
   * Crée une recette complète avec ses étapes et ingrédients en une transaction.
   * Les ingrédients sont créés à la volée s'ils n'existent pas encore.
   */
  create: (userId: string, data: CreateRecipeDto) =>
    prisma.$transaction(async (tx) => {
      /** Création de la recette de base */
      const recipe = await tx.recipe.create({
        data: {
          userId,
          name:            data.name,
          description:     data.description,
          preparationTime: data.preparationTime,
          cookingTime:     data.cookingTime,
          servings:        data.servings,
          status:          "PUBLISHED",
        },
      });

      /** Création des étapes ordonnées */
      await tx.recipeStep.createMany({
        data: data.steps.map((step) => ({
          recipeId:    recipe.id,
          position:    step.position,
          instruction: step.instruction,
        })),
      });

      /** Résolution et liaison des ingrédients */
      for (const item of data.ingredients) {
        const ingredient = await tx.ingredient.upsert({
          where:  { name: item.name },
          create: { name: item.name },
          update: {},
        });

        await tx.recipeIngredient.create({
          data: {
            recipeId:     recipe.id,
            ingredientId: ingredient.id,
            quantity:     item.quantity,
            unit:         item.unit,
          },
        });
      }

      /** Retourne la recette complète avec ses relations */
      return tx.recipe.findUniqueOrThrow({
        where: { id: recipe.id },
        include: {
          steps:       { orderBy: { position: "asc" } },
          ingredients: { include: { ingredient: true } },
        },
      });
    }),

  /** Recherche les ingrédients dont le nom contient la query (insensible à la casse). */
  searchIngredients: (query: string) =>
    prisma.ingredient.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: { name: "asc" },
      take: 10, // limite pour l'autocomplete
    }),
};