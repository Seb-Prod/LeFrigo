/**
 * @fileoverview Routes d'authentification.
 * @module routes/auth
 */

import { Router } from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../core/auth/auth.middleware";

const router = Router();

/** Inscription d'un nouvel utilisateur. */
router.post("/register", authController.register);

/** Connexion d'un utilisateur existant. */
router.post("/login", authController.login);

/** Vérification de l'adresse email via un token. */
router.get("/verify-email", authController.verifyEmail);

/** Rafraîchissement du token d'accès. */
router.post("/refresh", authController.refresh);

/** Déconnexion et invalidation de la session. */
router.post("/logout", authController.logout);

/** Récupération du profil de l'utilisateur connecté. Nécessite un token valide. */
router.get("/me", authMiddleware, authController.me);

/** Envoi d'un email de réinitialisation de mot de passe. */
router.post("/forgot-password", authController.forgotPassword);

/** Réinitialisation du mot de passe via un token. */
router.post("/reset-password", authController.resetPassword);

export default router;