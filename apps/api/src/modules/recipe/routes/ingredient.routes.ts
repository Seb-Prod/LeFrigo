import { Router } from "express";
import { authMiddleware } from "../../../core/auth/auth.middleware";
import { ingredientController } from "../controllers/";

const router = Router();

router.get("/search", authMiddleware, ingredientController.search);

export default router;
