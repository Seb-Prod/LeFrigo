import { Request, Response } from "express";
import { handleError } from "../../../core/errors/handleError";
import { ingredientService } from "../services";

export const ingredientController = {
  /** Retourne les ingrédients dont le nom correspond à la query (?q=). */
  search: async (req: Request, res: Response) => {
    try {
      const query = req.query.q;

      if (typeof query !== "string") {
        return res.status(400).json({ message: "Paramètre q manquant" });
      }

      const ingredients = await ingredientService.search(query);

      return res.json(ingredients);
    } catch (error) {
      return handleError(error, res);
    }
  },
};
