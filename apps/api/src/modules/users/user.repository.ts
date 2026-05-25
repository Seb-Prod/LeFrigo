import { prisma } from "../../lib/prisma";
import { CreateUserData } from "./user.types";

export const userRepository = {
  findAll: () => prisma.user.findMany(),

  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  findByEmailLower: (emailLower: string) =>
    prisma.user.findUnique({ where: { emailLower } }),

  findByUserName: (userName: string) =>
    prisma.user.findUnique({ where: { userName } }),

  create: (data: CreateUserData) => prisma.user.create({ data }),
};
