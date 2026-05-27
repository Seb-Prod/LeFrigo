import bcrypt from "bcrypt";
import { AppError } from "../../../core/errors/AppError";
import { userRepository } from "../../users/user.repository";
import { toSafeUser } from "../../users/user.types";
import { sessionRepository } from "../../sessions/session.repository";
import { generateRefreshToken, hashToken } from "../auth.utils";
import { jwtService } from "../../../core/auth/jwt.service";
import { config } from "../../../core/config";

/**
 * Authentifie un utilisateur et crée une session.
 *
 * - Vérifie l'existence, la validation email, le statut et le verrouillage du compte.
 * - Incrémente les tentatives échouées et verrouille après 5 échecs.
 * - Génère un accessToken JWT (court) et un refreshToken (long) avec rotation.
 *
 * @param email      - Adresse email de l'utilisateur.
 * @param password   - Mot de passe en clair à comparer.
 * @param rememberMe - Si true, session de 30j ; sinon 1j.
 * @param userAgent  - User-Agent du client (pour détection de session suspecte).
 * @param ip         - Adresse IP du client (pour audit).
 * @returns `accessToken`, `refreshToken` et l'utilisateur sans données sensibles (`SafeUser`).
 * @throws {AppError} 401 si email ou mot de passe incorrect.
 * @throws {AppError} 403 si email non vérifié ou compte inactif/suspendu.
 * @throws {AppError} 423 si compte temporairement verrouillé.
 */
export const loginService = {
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

      if (newCount >= config.auth.maxFailedAttempts) {
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
        (rememberMe
          ? config.auth.session.rememberMe
          : config.auth.session.default),
    );

    await sessionRepository.create({
      userId: user.id,
      refreshTokenHash,
      expiresAt,
      userAgent,
      ip,
      rememberMe,
      lastActivityAt: new Date(),
    });

    return { accessToken, refreshToken, user: toSafeUser(user) };
  },
};
