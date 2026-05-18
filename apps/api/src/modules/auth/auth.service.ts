import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../users/user.repository";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const authService = {
  register: async (email: string, password: string) => {
    const existing = await userRepository.findByEmail(email);

    if (existing) {
      throw new Error("User already exists");
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

    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token };
  },
};
