export const config = {
  auth: {
    maxFailedAttempts: Number(process.env.MAX_FAILED_ATTEMPTS) || 5,
    resetTokenTtlMs: Number(process.env.RESET_TOKEN_TTL_MS) || 60 * 60 * 1000,
    session: {
      default: Number(process.env.SESSION_TTL_MS) || 1 * 24 * 60 * 60 * 1000,
      rememberMe: Number(process.env.SESSION_REMEMBER_ME_TTL_MS) || 30 * 24 * 60 * 60 * 1000,
    },
  },
};