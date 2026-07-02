"use client";

import Link from "next/link";

import { Heading } from "@/components/ui";
import { RecipeCard, RecipeCardSkeleton } from "@/features/recipes";

import styles from "./RecipeHighlight.module.css";
import { useRecipes } from "@/features/recipes/hooks";

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
export function RecipeHighlight() {
  const { recipes, loading, error } = useRecipes({
    sort: "createdAt",
    order: "desc",
    limit: 10,
  });

  /* ── Gestion des états sans contenu ─────────────────────── */

  if (error || (!loading && recipes.length === 0)) {
    return null;
  }

  return (
    <section className={styles.section}>
      {/* ── En-tête ── */}
      <div className={styles.header}>
        <Heading size="sm" as="h2">
          Dernières recettes
        </Heading>

        <Link href="/recipes" className={styles.seeAll}>
          Voir tout
        </Link>
      </div>

      {/* ── Grille des recettes ── */}
      <div className={styles.grid}>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))
          : recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                layout="minimal"
                showDate
              />
            ))}
      </div>
    </section>
  );
}
