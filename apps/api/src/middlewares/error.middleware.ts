import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Ressource introuvable",
      });
    }
  }

  return res.status(500).json({
    message: "Erreur serveur",
  });
};