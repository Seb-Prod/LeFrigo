"use client";

import { Heading } from "@/components/ui";
import { RecipeCardCompact, RecipeCardCompactSkeleton } from "@/features/recipes";
import { useRandomRecipes } from "@/features/recipes/";

import styles from "./RecipeSpotlight.module.css";


/**
 * Met en avant les dernières recettes publiées sur la plateforme.
 *
 * Affiche un aperçu des recettes récentes avec un accès rapide
 * vers la liste complète des recettes.
 *
 * États visuels :
 * - `loading` → affichage des squelettes de chargement.
 * - `error` → section masquée.
 * - `vide` → section masquée.
 * - `succès` → affichage des recettes récentes.
 */
export function RecipeSpotlight() {
  const { recipes, loading, error } = useRandomRecipes(2);

  /* ── Gestion des états sans contenu ─────────────────────── */

  if (error || (!loading && recipes.length === 0)) {
    return null;
  }

  return (
    <section className={styles.section}>
      {/* ── En-tête ── */}
      <div className={styles.header}>
        <Heading size="sm" as="h2">
          À découvir
        </Heading>
      </div>

      {/* ── Grille des recettes ── */}
      <div className={styles.grid}>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <RecipeCardCompactSkeleton key={i} />
            ))
          : recipes.map((recipe) => (
              <RecipeCardCompact key={recipe.id} recipe={recipe} />
            ))}
      </div>
    </section>
  );
}
