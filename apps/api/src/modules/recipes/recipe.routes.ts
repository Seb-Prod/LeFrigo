import { Router } from "express";

import { recipeController } from "./recipe.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", recipeController.getAll);

router.post("/", recipeController.create);

router.delete("/:id", recipeController.delete);

export default router;
