import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { userRepository } from "../users/user.repository";
import { AppError } from "apps/api/src/core/errors/AppError";
import { toSafeUser } from "../users/user.types";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const authService = {
  register: async (userName: string, email: string, password: string) => {
    // Vérification de l'unicité de l'email
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

    // Génération du token de validation email
    const emailVerifyToken = crypto.randomBytes(32).toString("hex");

    const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Hachage du mot de passe
    const hashed = await bcrypt.hash(password, 10);

    // Création de l'user
    const user = await userRepository.create({
      userName,
      email,
      emailLower,
      password: hashed,
      emailVerifyToken,
      emailVerifyExpires,
    });

    return toSafeUser(user);
  },

  login: async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(401, "Email ou mot de passe incorrect");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AppError(401, "Email ou mot de passe incorrect");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token };
  },
};
