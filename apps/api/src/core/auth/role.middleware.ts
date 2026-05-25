import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";

export const roleMiddleware =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Non authentifié",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Accès refusé",
      });
    }

    next();
  };
