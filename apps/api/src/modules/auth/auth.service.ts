import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../users/user.repository";
import { AppError } from "apps/api/src/core/errors/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const authService = {
  register: async (email: string, password: string) => {
    const existing = await userRepository.findByEmail(email);

    if (existing) {
      throw new AppError(409, "User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      email,
      password: hashed,
    });

    return user;
  },

  login: async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(401, "Email ou mot de passe incorrect");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AppError(
        401,
        "Email ou mot de passe incorrect",
      );
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token };
  },
};
