import { Request, Response } from "express";
import { createRecipeSchema } from "@lefrigo/shared";
import { recipeService } from "../services/recipe.service";
import { handleError } from "../../../core/errors/handleError";

type RecipeParams = {
  id: string;
};
type PaginationQuery = { page?: string; limit?: string };

export const recipeController = {
  /** Valide le body via `createRecipeSchema` et crée la recette. */
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

      const recipe = await recipeService.create(req.user.id, result.data);

      return res.status(201).json(recipe);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Valide le body et met à jour la recette si elle appartient à l'utilisateur. */
  update: async (req: Request<RecipeParams>, res: Response) => {
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

      const recipe = await recipeService.update(
        req.params.id,
        req.user.id,
        result.data,
      );

      return res.status(201).json(recipe);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Retourne une recette complète par son ID. */
  getById: async (req: Request<RecipeParams>, res: Response) => {
    try {
      const recipeId = req.params.id;

      if (!recipeId || Array.isArray(recipeId)) {
        return res.status(400).json({
          message: "ID invalide",
        });
      }

      const recipe = await recipeService.getById(recipeId);

      return res.json(recipe);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Retourne la liste paginée des recettes de l'utilisateur connecté. */
  getMyRecipes: async (
    req: Request<{}, {}, {}, PaginationQuery>,
    res: Response,
  ) => {
    
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await recipeService.getUserRecipes(
        req.user.id,
        page,
        limit,
      );

      return res.json(result);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Retourne uniquement le nombre de recettes de l'utilisateur connecté. */
  getMyCount: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      const count = await recipeService.getUserRecipeCount(req.user.id);

      return res.json({ count });
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Retourne les N dernières recettes publiées (?limit=). */
  getRecent: async (
    req: Request<{}, {}, {}, { limit?: string }>,
    res: Response,
  ) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;

      const recipes = await recipeService.getRecentRecipes(limit);

      return res.json(recipes);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Retourne N recettes aléatoires publiées (?limit=). */
  getRandom: async (req: Request<{}, {}, {}, { limit?: string }>, res: Response) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;

      const recipes = await recipeService.getRandomRecipes(limit);

      return res.json(recipes);
    } catch (error) {
      return handleError(error, res);
    }
  },
};
