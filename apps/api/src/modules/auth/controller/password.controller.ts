import { Request, Response } from "express";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "packages/shared/dist";
import { authService } from "../auth.service";
import { handleError } from "apps/api/src/core/errors/handleError";

/**
 * Contrôleurs liés à la gestion des mots de passe.
 *
 * Regroupe :
 * - `forgotPassword`  → déclenche l'envoi d'un email de réinitialisation
 * - `resetPassword`   → applique le nouveau mot de passe via token (lien email)
 * - `changePassword`  → change le mot de passe depuis un compte authentifié
 */
export const passwordController = {
  /** Envoie un email de réinitialisation à l'adresse fournie. */
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const result = forgotPasswordSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Données invalides",
          errors: result.error.issues,
        });
      }

      const response = await authService.forgotPassword(result.data.email);

      return res.json(response);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Valide le token du lien email et remplace le mot de passe. */
  resetPassword: async (req: Request, res: Response) => {
    try {
      const result = resetPasswordSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Données invalides",
          errors: result.error.issues,
        });
      }

      const response = await authService.resetPassword(
        result.data.token,
        result.data.password,
      );

      return res.json(response);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /**
   * Vérifie l'ancien mot de passe, applique le nouveau.
   * sessionIdentifier permet d'invalider les autres sessions après changement.
   */
  changePassword: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      const { sessionIdentifier } = req.body;
      const result = changePasswordSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Données invalides",
          errors: result.error.issues,
        });
      }

      const response = await authService.changePassword(
        req.user.id,
        sessionIdentifier,
        result.data.password,
        result.data.newPassword,
      );

      return res.json(response);
    } catch (error) {
      return handleError(error, res);
    }
  },
};