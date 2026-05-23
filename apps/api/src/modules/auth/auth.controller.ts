import { Request, Response } from "express";
import { authService } from "./auth.service";
import { AppError } from "apps/api/src/core/errors/AppError";
import { loginSchema } from "@lefrigo/shared";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.json(user);
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

      const { email, password } = result.data;

      const auth = await authService.login(email, password);

      return res.json(auth);
    } catch (error) {
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
  },
};
