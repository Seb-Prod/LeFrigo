import { Request, Response } from "express";
import { authService } from "../auth.service";
import { handleError } from "apps/api/src/core/errors/handleError";

/**
 * Contrôleurs liés à la gestion des sessions utilisateur.
 *
 * Regroupe :
 * - `getSessions`    → liste toutes les sessions actives de l'utilisateur courant
 * - `revokeSession`  → révoque une session identifiée par son ID (param URL)
 */
export const sessionController = {
  /** Retourne la liste des sessions actives de l'utilisateur authentifié. */
  getSessions: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Non authentifié",
        });
      }

      const sessions = await authService.getSessions(req.user.id);

      return res.json(sessions);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Révoque la session ciblée par :sessionId ; ne peut agir que sur ses propres sessions. */
  revokeSession: async (req: Request, res: Response) => { // corrigé : revoqueSession → revokeSession
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Non authentifié", // corrigé : "authentidié" → "authentifié"
        });
      }

      const { sessionId } = req.params;

      if (typeof sessionId !== "string") {
        return res.status(400).json({
          message: "Session invalide",
        });
      }

      const result = await authService.revokeSession(req.user.id, sessionId);

      return res.json(result);
    } catch (error) {
      return handleError(error, res);
    }
  },
};