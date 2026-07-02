import { Router } from "express";
import { authMiddleware } from "../../../core/auth/auth.middleware";
import { recipeController } from "../controllers";

const router = Router();

/* ── Lecture authentifiée ──────────────────────────────────── */

/** Liste paginée des recettes de l'utilisateur connecté */
router.get("/me", authMiddleware, recipeController.getMyRecipes);

/** Nombre de recettes de l'utilisateur connecté */
router.get("/me/count", authMiddleware, recipeController.getMyCount);

/* ── Lecture publique ──────────────────────────────────────── */
/** Recherche de recettes (pagination, filtres, tri...) */
router.get("/", recipeController.find);



/** N recettes aléatoires publiées */
router.get("/random", recipeController.getRandom);

/** N recettes publiées dont la préparation est ≤ maxPrepTime (défaut : 10 min) */
router.get("/quick-prep", recipeController.find);

/** N recettes publiées dont préparation + cuisson est ≤ maxTotalTime (défaut : 30 min) */
router.get("/quick-meal", recipeController.getQuickMeal);

/** Recette complète par ID */
router.get("/:id", recipeController.getById);



/* ── Écriture authentifiée ─────────────────────────────────── */

/** Création d'une recette */
router.post("/", authMiddleware, recipeController.create);

/** Mise à jour d'une recette */
router.put("/:id", authMiddleware, recipeController.update);

export default router;