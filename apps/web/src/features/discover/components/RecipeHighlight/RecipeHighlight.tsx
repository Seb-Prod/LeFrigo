"use client";

import styles from "./RecipeHighlight.module.css";
import { Heading, Text } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { TbClock, TbUsers } from "react-icons/tb";
import { useRecentRecipes } from "@/features/recipes/hooks/useRecentRecipes";

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
              const totalTime =
                (recipe.preparationTime ?? 0) + (recipe.cookingTime ?? 0);

              return (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className={styles.card}
                >
                  {/* ── Thumbnail ── */}
                  <div className={styles.thumb}>
                      <div className={styles.placeholder}>
                        <span className={styles.placeholderIcon}>🍽️</span>
                      </div>
                  </div>

                  {/* ── Infos ── */}
                  <div className={styles.info}>
                    <Text className={styles.name}>{recipe.name}</Text>
                    <div className={styles.meta}>
                      {totalTime > 0 && (
                        <span className={styles.metaItem}>
                          <TbClock /> {totalTime} min
                        </span>
                      )}
                      {recipe.servings && (
                        <span className={styles.metaItem}>
                          <TbUsers /> {recipe.servings}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </section>
  );
}