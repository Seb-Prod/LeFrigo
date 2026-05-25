import { prisma } from "../../lib/prisma";
import { CreateUserData } from "./user.types";

export const userRepository = {
  findAll: () => prisma.user.findMany(),

  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  findByEmailLower: (emailLower: string) =>
    prisma.user.findUnique({ where: { emailLower } }),

  findByEmailVerifyToken: (token: string) =>
    prisma.user.findFirst({
      where: { emailVerifyToken: token },
    }),

  findByUserName: (userName: string) =>
    prisma.user.findUnique({ where: { userName } }),

  verifyMail: (userId: string) =>
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: true,
        status: "ACTIVE",
        emailVerifyToken: null,
        emailVerifyExpires: null,
      },
    }),

  create: (data: CreateUserData) => prisma.user.create({ data }),
};
