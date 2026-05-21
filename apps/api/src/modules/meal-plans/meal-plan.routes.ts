import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { mealPlanController } from "./meal-plan.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", mealPlanController.getAll);

router.post("/", mealPlanController.create);

export default router;
