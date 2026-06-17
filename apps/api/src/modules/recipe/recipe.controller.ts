import { Request, Response } from "express";
import { createRecipeSchema } from "@lefrigo/shared";
import { recipeService } from "./recipe.service";
import { handleError } from "apps/api/src/core/errors/handleError";

/**
 * Contrôleurs liés aux recettes.
 *
 * Regroupe :
 * - `create`             → crée une recette complète pour l'utilisateur connecté
 * - `searchIngredients`  → recherche les ingrédients existants (autocomplete)
 */
export const recipeController = {
  /** Valide le body via `createRecipeSchema` et crée la recette. */
  create: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      const result = createRecipeSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Données invalides",
          errors: result.error.issues,
        });
      }

      const recipe = await recipeService.createRecipe(
        req.user.id,
        result.data,
      );

      return res.status(201).json(recipe);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Retourne les ingrédients dont le nom correspond à la query (?q=). */
  searchIngredients: async (req: Request, res: Response) => {
    try {
      const query = req.query.q;

      if (typeof query !== "string") {
        return res.status(400).json({ message: "Paramètre q manquant" });
      }

      const ingredients = await recipeService.searchIngredients(query);

      return res.json(ingredients);
    } catch (error) {
      return handleError(error, res);
    }
  },
};