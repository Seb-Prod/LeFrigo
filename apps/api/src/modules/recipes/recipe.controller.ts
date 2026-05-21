import { Request, Response } from "express";
import { recipeService } from "./recipe.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { createRecipeSchema } from "./recipe.shemas";

type CreateRecipeBody = {
  name: string;
};

export const recipeController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const recipes = await recipeService.getAll(userId);

    return res.json(recipes);
  }),

  create: asyncHandler(
    async (req: Request<{}, {}, CreateRecipeBody>, res: Response) => {
      const body = createRecipeSchema.parse(req.body);

      const userId = req.user.userId;
      const  name  = body.name;

      const recipe = await recipeService.create(name, userId);

      return res.status(201).json(recipe);
    },
  ),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    await recipeService.delete(req.params.id as string, userId);
    return res.status(204).send();
  }),
};
