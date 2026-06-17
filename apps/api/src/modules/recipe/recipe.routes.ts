/**
 * @fileoverview Routes d'authentification.
 * @module routes/recipe
 */

import { Router } from "express";
import { authMiddleware } from "../../core/auth/auth.middleware";
import { recipeController } from "./recipe.controller";

const router = Router();

/* ── Routes recettes ───────────────────────────────────────── */

/** Recherche d'ingrédients pour l'autocomplete — avant /:id pour éviter les conflits */
router.get("/ingredients/search", authMiddleware, recipeController.searchIngredients);

/** Création d'une recette */
router.post("/", authMiddleware, recipeController.create);

export default router;
