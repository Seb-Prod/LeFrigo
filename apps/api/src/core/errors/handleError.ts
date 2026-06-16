
import { Response } from "express";
import { AppError } from "./AppError";

/**
 * Gestion centralisée des erreurs du contrôleur.
 */
export function handleError(error: unknown, res: Response) {
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