import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return res.status(404).json({
      message: "Ressource introuvable",
    });
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }

  return res.status(500).json({
    message: "Erreur serveur",
  });
};