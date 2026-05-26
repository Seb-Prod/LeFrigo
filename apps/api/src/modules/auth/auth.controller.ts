import { Request, Response } from "express";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordShema } from "@lefrigo/shared";

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
        result.data.rememberMe,

        req.headers["user-agent"],
        req.ip,
      );

      return res.json(auth);
    } catch (error) {
      return handleError(error, res);
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          message: "Refresh token manquant",
        });
      }

      const result = await authService.refresh(refreshToken);

      return res.json(result);
    } catch (error) {
      return handleError(error, res);
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          message: "Refresh token manquant",
        });
      }

      const result = await authService.logout(refreshToken);

      return res.json(result);
    } catch (error) {
      return handleError(error, res);
    }
  },

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

  resetPassword: async (req: Request, res: Response) => {
    try {
      const result = resetPasswordShema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          messages: "Données invalide",
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
