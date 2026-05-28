import { prisma } from "../../lib/prisma";

export const sessionRepository = {
  create: (data: {
    userId: string;
    refreshTokenHash: string;
    userAgent?: string;
    ip?: string;
    expiresAt: Date;
    rememberMe?: boolean;
    lastActivityAt: Date;
  }) =>
    prisma.session.create({
      data,
    }),

  findByTokenHash: (refreshTokenHash: string) =>
    prisma.session.findFirst({
      where: {
        refreshTokenHash,
        revoked: false,
      },
    }),

  revoke: (sessionId: string) =>
    prisma.session.update({
      where: { id: sessionId },
      data: { revoked: true },
    }),

  revokeAllUserSessions: (userId: string) =>
    prisma.session.updateMany({
      where: { userId },
      data: { revoked: true },
    }),

  findValidSession: (refreshTokenHash: string) =>
    prisma.session.findFirst({
      where: {
        refreshTokenHash,
        revoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    }),

  deleteExpiredSessions: () =>
    prisma.session.deleteMany({
      where: {
        OR: [
          { revoked: true },
          {
            expiresAt: {
              lt: new Date(),
            },
          },
        ],
      },
    }),

  revokeById: (sessionId: string, userId: string) =>
    prisma.session.updateMany({
      where: {
        id: sessionId,
        userId,
      },
      data: {
        revoked: true,
      },
    }),

  findUserSessions: (userId: string) =>
    prisma.session.findMany({
      where: {
        userId,
        revoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        lastActivityAt: "desc",
      },
    }),

    
};
