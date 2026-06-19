import { Request, Response } from "express";
import { createRecipeSchema } from "@lefrigo/shared";
import { recipeService } from "../services/recipe.service";
import { handleError } from "../../../core/errors/handleError";

export const recipeController = {
  create: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Non authentifié",
        });
      }

      const result = createRecipeSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Données invalides",
          errors: result.error.issues,
        });
      }

      const recipe = await recipeService.create(
        req.user.id,
        result.data,
      );

      return res.status(201).json(recipe);
    } catch (error) {
      return handleError(error, res);
    }
  },
};