/**
 * @fileoverview Routes d'authentification.
 * @module routes/profile
 */

import { Router } from "express";
import { authMiddleware } from "../../core/auth/auth.middleware";
import { profileController } from "./profile.controller";

const router = Router();

router.post(
  "/profile/username",
  authMiddleware,
  profileController.changeUsername,
);

export default router;
