import { jwtService } from "./jwt.service";
import { userRepository } from "../../modules/users/user.repository";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token manquant",
    });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token invalide" });
  }

  try {
    const payload = jwtService.verifyAccessToken(token);

    const user = await userRepository.findById(payload.userId);

    if (!user) {
      return res.status(401).json({
        message: "Utilisateur introuvablee",
      });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Adresse email non vérifiée",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        message: "Compte inactif ou suspendu",
      });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
};
