import { prisma } from "../lib/prisma";

export const userRepository = {
  findAll: () => prisma.user.findMany(),

  create: (data: { email: string; password: string }) =>
    prisma.user.create({ data }),
};