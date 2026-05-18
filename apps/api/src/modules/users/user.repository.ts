import { prisma } from "../../lib/prisma";

export const userRepository = {
  findAll: () => prisma.user.findMany(),

  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  create: (data: { email: string; password: string }) =>
    prisma.user.create({ data }),
};
