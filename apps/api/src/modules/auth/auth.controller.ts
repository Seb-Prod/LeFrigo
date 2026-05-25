import { Request, Response } from "express";
import { loginSchema, registerSchema } from "@lefrigo/shared";

import { authService } from "./auth.service";
import { AppError } from "apps/api/src/core/errors/AppError";

export const authController = {
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

  login: async (req: Request, res: Response) => {
    try {
      const result = loginSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Données invalides",
          errors: result.error.issues,
        });
      }

      const auth = await authService.login(
        result.data.email,
        result.data.password,
      );

      return res.json(auth);
    } catch (error) {
      return handleError(error, res);
    }
  },
};

/**
 * Gestion centralisée des erreurs du contrôleur.
 */
function handleError(error: unknown, res: Response) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Erreur serveur",
  });
}
