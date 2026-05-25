import { prisma } from "../../lib/prisma";

export const sessionRepository = {
  create: (data: {
    userId: string;
    refreshTokenHash: string;
    userAgent?: string;
    ip?: string;
    expiresAt: Date;
  }) => {
    prisma.session.create({
      data,
    });
  },

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
};
