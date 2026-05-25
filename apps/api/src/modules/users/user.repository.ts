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

  incrementFailedLogin: (userId: string) =>
    prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: {
          increment: 1,
        },
      },
    }),

  lockUser: (userId: string) =>
    prisma.user.update({
      where: { id: userId },
      data: {
        lockedUntil: new Date(Date.now() + 15 * 60 * 1000),
        failedLoginAttempts: 0,
      },
    }),

  resetLoginAttempts: (userId: string) =>
    prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    }),

  verifyEmail: (userId: string) =>
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

  findById: (id: string) =>
    prisma.user.findUnique({
      where: { id },
    }),

  create: (data: CreateUserData) => prisma.user.create({ data }),

  findByResetPasswordToken: (token: string) =>
    prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
      },
    }),

  setResetPasswordToken: (userId: string, token: string, expiresAt: Date) =>
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expiresAt,
      },
    }),

  updatePassword: (userId: string, password: string) =>
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,

        resetPasswordToken: null,
        resetPasswordExpires: null,

        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    }),
};
