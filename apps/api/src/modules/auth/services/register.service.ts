import crypto from "crypto";
import bcrypt from "bcrypt";
import { userRepository } from "../../users/user.repository";
import { mailService } from "../../mail/mail.service";
import { AppError } from "../../../core/errors/AppError";
import { toSafeUser } from "../../users/user.types";

export const registerService = {
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
   * @param token - Token de vérification transmis dans le lien d'activation.
   * @returns Un message de confirmation.
   * @throws {AppError} 400 si le token est invalide ou expiré.
   */
  verifyEmail: async (token: string) => {
    const user = await userRepository.findByEmailVerifyToken(token);

    if (!user) {
      throw new AppError(400, "Token de validation invalide");
    }

    if (!user.emailVerifyExpires || user.emailVerifyExpires < new Date()) {
      throw new AppError(400, "Token expiré");
    }

    await userRepository.verifyEmail(user.id);

    return { message: "Adresse email validée" };
  },
};