import { Request, Response } from "express";
import { authService } from "../auth.service";
import { handleError } from "apps/api/src/core/errors/handleError";

/**
 * Contrôleur lié au profil de l'utilisateur authentifié.
 *
 * Regroupe :
 * - `me` → retourne les informations de l'utilisateur courant
 */
export const meController = {
  /** Récupère le profil de l'utilisateur identifié par le token en cours. */
  me: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Non authentifié",
        });
      }

      const user = await authService.me(req.user.id);
      return res.json(user);
    } catch (error) {
      return handleError(error, res);
    }
  },
};