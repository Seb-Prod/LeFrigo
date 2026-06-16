/**
 * @fileoverview Routes d'authentification.
 * @module routes/auth
 */

import { Router } from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../core/auth/auth.middleware";
import { authRateLimit, resendRateLimit } from "../../middlewares/rateLimit";

const router = Router();

/* ── Inscription / Connexion ──────────────────────────────── */

router.post("/register", authRateLimit, authController.register);
router.post("/login", authRateLimit, authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post("/logout-all", authMiddleware, authController.logoutAllDevices);

/* ── Vérification email ───────────────────────────────────── */

router.get("/verify-email", authController.verifyEmail);
router.post(
  "/resend-verification",
  resendRateLimit,
  authController.resendVerification,
);

/* ── Mot de passe ─────────────────────────────────────────── */

router.post("/forgot-password", authRateLimit, authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/change-password", authMiddleware, authController.changePassword);

/* ── Sessions ─────────────────────────────────────────────── */

router.get("/sessions", authMiddleware, authController.getSessions);
router.delete(
  "/sessions/:sessionId",
  authMiddleware,
  authController.revokeSession,
);

/* ── Profil ───────────────────────────────────────────────── */

router.get("/me", authMiddleware, authController.me);

export default router;
