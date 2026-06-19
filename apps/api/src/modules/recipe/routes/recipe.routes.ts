import { Router } from "express";
import { authMiddleware } from "../../../core/auth/auth.middleware";
import { recipeController } from "../controllers";

const router = Router();

/* ── Lecture publique ──────────────────────────────────────── */

/** N dernières recettes publiées */
router.get("/recent", recipeController.getRecent);

/** N recettes aléatoires publiées */
router.get("/random", recipeController.getRandom);

/** Recette complète par ID */
router.get("/:id", recipeController.getById);

/* ── Lecture authentifiée ──────────────────────────────────── */

/** Liste paginée des recettes de l'utilisateur connecté */
router.get("/me", authMiddleware, recipeController.getMyRecipes);

/** Nombre de recettes de l'utilisateur connecté */
router.get("/me/count", authMiddleware, recipeController.getMyCount);

/* ── Écriture authentifiée ─────────────────────────────────── */

/** Création d'une recette */
router.post("/", authMiddleware, recipeController.create);

/** Mise à jour d'une recette */
router.put("/:id", authMiddleware, recipeController.update);

export default router;