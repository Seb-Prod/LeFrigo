import { Request, Response } from "express";
import { recipeService } from "./recipe.service";
import { Prisma } from "@prisma/client";
import { asyncHandler } from "../../utils/asyncHandler";

type DeleteRecipeParams = {
  id: string;
};

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
      const userId = req.user.userId;
      const { name } = req.body;

      const recipe = await recipeService.create(name, userId);

      return res.status(201).json(recipe);
    },
  ),

  delete: asyncHandler(
    async (req: Request, res: Response) => {
      await recipeService.delete(req.params.id as string);
      return res.status(204).send();
    },
  ),
};
