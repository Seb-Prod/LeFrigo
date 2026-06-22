"use client";

import styles from "./RecipeHighlight.module.css";
import { Heading, Text } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { TbClock, TbUsers } from "react-icons/tb";
import { useRecentRecipes } from "@/features/recipes/hooks/useRecentRecipes";
import { RecipeCard } from "@/features/recipes";

/**
 * Section "Dernières recettes" de la page découverte.
 *
 * États visuels :
 * - `loading` → squelettes de chargement
 * - `error`   → silencieux (section masquée)
 * - `vide`    → section masquée
 * - `succès`  → grille de cards cliquables
 */
export function RecipeHighlight() {
  const { recipes, loading, error } = useRecentRecipes(5);

  if (error || (!loading && recipes.length === 0)) return null;

  return (
    <section className={styles.section}>
      {/* ── En-tête ── */}
      <div className={styles.header}>
        <Heading size="sm" as="h2">Dernières recettes</Heading>
        <Link href="/recipes" className={styles.seeAll}>Voir tout</Link>
      </div>

      {/* ── Grille ── */}
      <div className={styles.grid}>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))
          : recipes.map((recipe) => {
              return <RecipeCard key={recipe.id} recipe={recipe}/>
            })}
      </div>
    </section>
  );
}