import { Request, Response } from "express";
import { forgotPasswordSchema, registerSchema } from "packages/shared/dist";
import { authService } from "../auth.service";
import { handleError } from "apps/api/src/core/errors/handleError";

/**
 * Contrôleurs liés à l'inscription et à la vérification d'email.
 *
 * Regroupe :
 * - `register`            → création de compte + envoi de l'email de vérification
 * - `verifyEmail`         → confirmation via token (query param)
 * - `resendVerification`  → renvoi de l'email de vérification à la demande
 */
export const registerController = {
  /** Valide le body, crée l'utilisateur via le service et retourne 201. */
  register: async (req: Request, res: Response) => {
    try {
      const result = registerSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Données invalides",
          errors: result.error.issues,
        });
      }

      const { userName, email, password } = result.data;

      const user = await authService.register(userName, email, password);

      return res.status(201).json(user);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Vérifie le token transmis en query param (?token=...) et active le compte. */
  verifyEmail: async (req: Request, res: Response) => {
    try {
      const token = req.query.token;

      if (typeof token !== "string" || !token.trim()) {
        return res.status(400).json({
          message: "Token manquant",
        });
      }

      const result = await authService.verifyEmail(token);

      return res.json(result);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Renvoie l'email de vérification pour l'adresse fournie. Répond 204 sans body. */
  resendVerification: async (req: Request, res: Response) => {
    try {
      const result = forgotPasswordSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Données invalides",
          errors: result.error.issues,
        });
      }

      await authService.resendVerification(result.data.email);

      return res.status(204).send();
    } catch (error) {
      return handleError(error, res);
    }
  },
};