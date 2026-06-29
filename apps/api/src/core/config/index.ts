export const config = {
  auth: {
    maxFailedAttempts: Number(process.env.MAX_FAILED_ATTEMPTS) || 5,
    resetTokenTtlMs: Number(process.env.RESET_TOKEN_TTL_MS) || 60 * 60 * 1000,
    session: {
      default: Number(process.env.SESSION_TTL_MS) || 1 * 24 * 60 * 60 * 1000,
      rememberMe:
        Number(process.env.SESSION_REMEMBER_ME_TTL_MS) ||
        30 * 24 * 60 * 60 * 1000,
    },
  },
  recipes: {
    recentLimit: Number(process.env.RECIPES_RECENT_LIMIT) || 5,
    randomLimit: Number(process.env.RECIPES_RANDOM_LIMIT) || 5,
    quickPrepLimit: Number(process.env.RECIPES_QUICK_PREP_LIMIT) || 5,
    quickPrepMaxTime: Number(process.env.RECIPES_QUICK_PREP_MAX_TIME) || 10,
    quickMealLimit: Number(process.env.RECIPES_QUICK_MEAL_LIMIT) || 5,
    quickMealMaxTime: Number(process.env.RECIPES_QUICK_MEAL_MAX_TIME) || 30,
  },
};
