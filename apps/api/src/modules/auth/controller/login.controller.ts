import { Request, Response } from "express";
import { loginSchema } from "packages/shared/dist";
import { authService } from "../auth.service";
import { handleError } from "apps/api/src/core/errors/handleError";

/**
 * Contrôleurs liés à l'authentification et à la gestion des sessions actives.
 *
 * Regroupe :
 * - `login`             → authentification + émission des tokens (user-agent & IP transmis au service)
 * - `refresh`           → renouvellement du access token via refresh token
 * - `logout`            → révocation du refresh token courant
 * - `logoutAllDevices`  → révocation de toutes les sessions sauf optionnellement la courante
 */
export const loginController = {
  /** Valide le body, transmet user-agent et IP au service, retourne les tokens. */
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

  /** Renouvelle le access token ; transmet IP et user-agent pour contrôle de cohérence. */
  refresh: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          message: "Refresh token manquant",
        });
      }

      const currentIp = req.ip;
      const currentUserAgent = req.headers["user-agent"];

      const result = await authService.refresh(
        refreshToken,
        currentIp,
        currentUserAgent,
      );

      return res.json(result);
    } catch (error) {
      return handleError(error, res);
    }
  },

  /** Révoque le refresh token fourni, invalidant la session courante. */
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

  /** Révoque toutes les sessions de l'utilisateur ; sessionIdentifier permet d'en exclure une. */
  logoutAllDevices: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Non authentifié",
        });
      }

      const { sessionIdentifier } = req.body;

      const result = await authService.logoutAllDevices(
        req.user.id,
        sessionIdentifier,
      );

      return res.json(result);
    } catch (error) {
      return handleError(error, res);
    }
  },
};