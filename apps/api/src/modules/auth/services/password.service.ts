import crypto from "crypto";
import bcrypt from "bcrypt";
import { userRepository } from "../../users/user.repository";
import { mailService } from "../../mail/mail.service";
import { AppError } from "../../../core/errors/AppError";
import { sessionRepository } from "../../sessions/session.repository";
import { config } from "../../../core/config";

export const passwordService = {
  /**
   * Déclenche la procédure de réinitialisation de mot de passe.
   *
   * - Génère un token aléatoire valable 1h et l'envoie par email.
   * - Retourne toujours le même message (anti-énumération) qu'un compte existe ou non.
   *
   * @param email - Adresse email du compte à réinitialiser.
   * @returns Message de confirmation générique.
   */
  forgotPassword: async (email: string) => {
    const user = await userRepository.findByEmail(email);

    // Anti-enumération
    if (!user) {
      return {
        message: "Si le compte existe, un email a été envoyé",
      };
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + config.auth.resetTokenTtlMs);

    await userRepository.setResetPasswordToken(user.id, token, expiresAt);

    await mailService.sendResetPasswordEmail(user.email, token);

    return {
      message: "Si ce compte existe, un email a été envoyé",
    };
  },

  /**
   * Réinitialise le mot de passe via le token reçu par email.
   *
   * - Vérifie l'existence et la validité (expiration) du token.
   * - Hache le nouveau mot de passe avant persistance.
   * - Révoque toutes les sessions actives de l'utilisateur.
   *
   * @param token       - Token de réinitialisation transmis dans le lien email.
   * @param newPassword - Nouveau mot de passe en clair (sera haché).
   * @returns Message de confirmation.
   * @throws {AppError} 400 si le token est invalide ou expiré.
   */
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
