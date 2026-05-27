import bcrypt from "bcrypt";
import crypto from "crypto";
import { userRepository } from "../users/user.repository";
import { AppError } from "../../core/errors/AppError";
import { toSafeUser } from "../users/user.types";
import { generateRefreshToken, hashToken } from "../auth/auth.utils";
import { sessionRepository } from "../sessions/session.repository";
import { jwtService } from "../../core/auth/jwt.service";
import { mailService } from "../mail/mail.service";
import { prisma } from "../../lib/prisma";

export const authService = {
  /**
   * Inscrit un nouvel utilisateur.
   *
   * - Vérifie l'unicité de l'email (insensible à la casse) et du nom d'utilisateur.
   * - Génère un token de validation d'email valable 24h.
   * - Hache le mot de passe avant persistance.
   *
   * @param userName - Nom d'utilisateur choisi.
   * @param email    - Adresse email (normalisée en minuscules).
   * @param password - Mot de passe en clair (sera haché).
   * @returns L'utilisateur créé sans données sensibles (`SafeUser`).
   * @throws {AppError} 409 si l'email ou le nom d'utilisateur est déjà pris.
   */
  register: async (userName: string, email: string, password: string) => {
    // Normalisation de l'email pour une comparaison insensible à la casse
    const emailLower = email.trim().toLowerCase();
    const existingEmail = await userRepository.findByEmailLower(emailLower);

    if (existingEmail) {
      throw new AppError(409, "Cette adresse email est déjà utilisée");
    }

    // Vérification de l'unicité du userName
    const existingUserName = await userRepository.findByUserName(userName);

    if (existingUserName) {
      throw new AppError(409, "Ce nom d'utilisateur est déjà utilisé");
    }

    // Token aléatoire de 32 octets, valable 24h, envoyé par email pour valider le compte
    const emailVerifyToken = crypto.randomBytes(32).toString("hex");
    const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Hachage du mot de passe avec un coût bcrypt de 10
    const hashed = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      userName,
      email,
      emailLower,
      password: hashed,
      emailVerifyToken,
      emailVerifyExpires,
    });

    await mailService.sendVerificationEmail(user.email, emailVerifyToken);

    return toSafeUser(user);
  },

  /**
   * Valide l'adresse email d'un utilisateur via le token reçu par email.
   *
   * - Vérifie l'existence et la validité (expiration) du token.
   * - Marque le compte comme vérifié en base.
   *
   * @param token - Token de vérification transmis dans le lien d'activation.
   * @returns Un message de confirmation.
   * @throws {AppError} 400 si le token est invalide ou expiré.
   */
  verifyEmail: async (token: string) => {
    const user = await userRepository.findByEmailVerifyToken(token);

    if (!user) {
      throw new AppError(400, "Token de validation invalide");
    }

    // Vérification de l'expiration du token (durée de vie : 24h)
    if (!user.emailVerifyExpires || user.emailVerifyExpires < new Date()) {
      throw new AppError(400, "Token expiré");
    }

    await userRepository.verifyEmail(user.id);

    return { message: "Adresse email validée" };
  },

  login: async (
    email: string,
    password: string,
    rememberMe: boolean,
    userAgent?: string,
    ip?: string,
  ) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(401, "Email ou mot de passe incorrect");
    }

    if (!user.emailVerified) {
      throw new AppError(403, "Veuillez valider votre email");
    }

    if (user.status !== "ACTIVE") {
      throw new AppError(403, "Compte inactif ou suspendu");
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new AppError(423, "Compte temporairement verrouillé");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      const newCount = user.failedLoginAttempts + 1;

      await userRepository.incrementFailedLogin(user.id);

      if (newCount >= 5) {
        await userRepository.lockUser(user.id);
      }

      throw new AppError(401, "Email ou mot de passe incorrect");
    }

    // Reset secutité
    await userRepository.resetLoginAttempts(user.id);

    // Access token (court)
    const accessToken = jwtService.generateAccessToken(user.id);

    // Refresh Token (long)
    const refreshToken = generateRefreshToken();
    const refreshTokenHash = hashToken(refreshToken);

    const expiresAt = new Date(
      Date.now() +
        (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 24 * 60 * 60 * 1000),
    );

    await sessionRepository.create({
      userId: user.id,
      refreshTokenHash,
      expiresAt,
      userAgent,
      ip,
    });

    return { accessToken, refreshToken, user: toSafeUser(user) };
  },

  refresh: async (refreshToken: string) => {
    return prisma.$transaction(async (tx) => {
      const refreshTokenHash = hashToken(refreshToken);

      const session = await tx.session.findFirst({
        where: {
          refreshTokenHash,
          revoked: false,
          expiresAt: {
            gt: new Date(),
          },
        },
        include: {
          user: true,
        },
      });

      if (!session) {
        throw new AppError(401, "Session invalide");
      }

      await tx.session.update({
        where: {
          id: session.id,
        },
        data: {
          revoked: true,
        },
      });

      const newRefreshToken = generateRefreshToken();

      await tx.session.create({
        data: {
          userId: session.userId,
          refreshTokenHash: hashToken(newRefreshToken),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      const accessToken = jwtService.generateAccessToken(session.userId);

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    });
  },

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
  logoutAllDevices: async (userId: string) => {
    await sessionRepository.revokeAllUserSessions(userId);
    return {
      message: "Toutes les sessions ont été fermées",
    };
  },

  me: async (userId: string) => {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "utilisateur introuvable");
    }
    return toSafeUser(user);
  },

  forgotPassword: async (email: string) => {
    const user = await userRepository.findByEmail(email);

    // Anti-enumération
    if (!user) {
      return {
        message: "Si le compte existe, un email a été envoyé",
      };
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await userRepository.setResetPasswordToken(user.id, token, expiresAt);

    await mailService.sendResetPasswordEmail(user.email, token);

    return {
      message: "Si ce compte existe, un email a été envoyé",
    };
  },

  resetPassword: async (token: string, newPassword: string) => {
    const user = await userRepository.findByResetPasswordToken(token);

    if (!user) {
      throw new AppError(400, "Token invalide");
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new AppError(400, "tokeb expiré");
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(user.id, hashed);

    await sessionRepository.revokeAllUserSessions(user.id);

    return { message: "Mot de passe réinitialisé" };
  },
};
