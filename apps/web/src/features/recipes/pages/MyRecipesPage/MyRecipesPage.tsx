"use client";

import { TbChefHat, TbPlus } from "react-icons/tb";
import { Button } from "@/components/ui";
import { useMyRecipes } from "../../hooks/useMyRecipes";
import { RecipeCard } from "../../components/RecipeCard2";
import styles from "./MyRecipesPage.module.css";
import Link from "next/link";

/**
 * Page listant les recettes de l'utilisateur connecté.
 *
 * États visuels :
 * - `loading` → squelettes de chargement
 * - `error`   → message d'erreur
 * - `vide`    → invite à créer une première recette
 * - `succès`  → grille de recettes + pagination
 */
export function MyRecipesPage() {
  const { recipes, total, totalPages, page, loading, error, goToPage } =
    useMyRecipes();

  /* ── Chargement ── */
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  /* ── Erreur ── */
  if (error) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Une erreur est survenue.</p>
      </div>
    );
  }

  /* ── Vide ── */
  if (recipes.length === 0) {
    return (
      <div className={styles.empty}>
        <TbChefHat className={styles.emptyIcon} />
        <p className={styles.emptyText}>Vous n&apos;avez pas encore de recette.</p>
        <Button >
          <Link href="/recipes/create">
            <TbPlus /> Créer une recette
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <p className={styles.total}>{total} recette{total > 1 ? "s" : ""}</p>
        <Button >
          <Link href="/recipes/create">
            <TbPlus /> Nouvelle recette
          </Link>
        </Button>
      </div>

      {/* ── Grille ── */}
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Button
            type="button"
            variant="ghost"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            Précédent
          </Button>
          <span className={styles.pageInfo}>
            {page} / {totalPages}
          </span>
          <Button
            type="button"
            variant="ghost"
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}