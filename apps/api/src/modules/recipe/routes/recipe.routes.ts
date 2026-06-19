import { Router } from "express";
import { authMiddleware } from "../../../core/auth/auth.middleware";
import { recipeController } from "../controllers";

const router = Router();

router.post("/", authMiddleware, recipeController.create);

export default router;
