import rateLimit from "express-rate-limit";

/** Routes publique sensibles - login, register, forgot password */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Trop de tentatives, réessayez dans 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

/** Renvoi d'eamil - plus restrictif  */
export const resendRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { message: "Trop de demandes, réessayer dans une heure." },
  standardHeaders: true,
  legacyHeaders: false,
});
