import { prisma } from "../../../lib/prisma";
import { generateRefreshToken, hashToken } from "../auth.utils";
import { AppError } from "../../../core/errors/AppError";
import { jwtService } from "../../../core/auth/jwt.service";
import { sessionRepository } from "../../sessions/session.repository";
import { config } from "../../../core/config";
import { tr } from "zod/locales";

export const sessionService = {
  /**
   * Renouvelle une session via rotation du refreshToken.
   *
   * - Vérifie que la session existe, n'est pas révoquée et non expirée.
   * - Détecte une session suspecte si le User-Agent a changé → révoque toutes les sessions.
   * - Révoque l'ancien refreshToken et en génère un nouveau (rotation).
   * - Conserve la durée rememberMe de la session d'origine.
   *
   * @param refreshToken      - Token de rafraîchissement envoyé par le client.
   * @param currentIp         - IP courante du client (mise à jour en base).
   * @param currentUserAgent  - User-Agent courant (comparé à celui de la session).
   * @returns Nouvel `accessToken` JWT et nouveau `refreshToken`.
   * @throws {AppError} 401 si la session est invalide ou expirée.
   * @throws {AppError} 401 si le User-Agent ne correspond pas (session suspecte).
   */
  refresh: async (
    refreshToken: string,
    currentIp?: string,
    currentUserAgent?: string,
  ) => {
    return prisma.$transaction(async (tx) => {
      const refreshTokenHash = hashToken(refreshToken);

      const session = await tx.session.findFirst({
        where: {
          refreshTokenHash,
          revoked: false,
          expiresAt: { gt: new Date() },
        },
        include: { user: true },
      });

      if (!session) {
        throw new AppError(401, "Session invalide");
      }

      if (session.userAgent !== currentUserAgent) {
        await tx.session.updateMany({
          where: { userId: session.userId },
          data: { revoked: true },
        });
        throw new AppError(401, "Session suspecte détectée");
      }

      await tx.session.update({
        where: { id: session.id },
        data: { revoked: true },
      });

      const newRefreshToken = generateRefreshToken();
      const duration = session.rememberMe
        ? config.auth.session.rememberMe
        : config.auth.session.default;

      await tx.session.create({
        data: {
          userId: session.userId,
          refreshTokenHash: hashToken(newRefreshToken),
          expiresAt: new Date(Date.now() + duration),
          rememberMe: session.rememberMe,
          userAgent: session.userAgent,
          ip: currentIp, // ← mettre à jour l'IP courante
          lastActivityAt: new Date(),
        },
      });

      const accessToken = jwtService.generateAccessToken(session.userId);

      return { accessToken, refreshToken: newRefreshToken };
    });
  },

  /**
   * Révoque la session associée au refreshToken.
   *
   * - Si la session est introuvable ou déjà révoquée, retourne silencieusement.
   *
   * @param refreshToken - Token de rafraîchissement à invalider.
   * @returns Message de confirmation.
   */
  logout: async (refreshToken: string) => {
    const refreshTokenHash = hashToken(refreshToken);

    const session = await sessionRepository.findValidSession(refreshTokenHash);

    if (!session) {
      return {
        message: "déjà déconnecté",
      };
    }

    await sessionRepository.revoke(session.id);

    return {
      message: "Déconnexion réussie",
    };
  },

  /**
   * Révoque toutes les sessions actives d'un utilisateur.
   *
   * Utile en cas de compromission de compte ou de changement de mot de passe.
   *
   * @param userId - Identifiant de l'utilisateur.
   * @returns Message de confirmation.
   */
  logoutAllDevices: async (userId: string) => {
    await sessionRepository.revokeAllUserSessions(userId);
    return {
      message: "Toutes les sessions ont été fermées",
    };
  },

  getSessions: async (userId: string) => {
    return prisma.session.findMany({
      where: {
        userId,
        revoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        lastActivityAt: "desc",
      },
      select: {
        id: true,
        userAgent: true,
        ip: true,
        createdAt: true,
        lastActivityAt: true,
        expiresAt: true,
        rememberMe: true,
      },
    });
  },

  revokeSession: async (userId: string, sessionId: string) => {
    await sessionRepository.revokeById(sessionId, userId);

    return {
      message: "Session révoquée",
    };
  },
};
