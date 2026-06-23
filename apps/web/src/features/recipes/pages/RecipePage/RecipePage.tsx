"use client";

import Image from "next/image";
import Link from "next/link";
import { TbArrowLeft, TbClock, TbFlame, TbUsers } from "react-icons/tb";
import { ErrorState, Text } from "@/components/ui";
import { useRecipe } from "@/features/recipes/hooks/useRecipe";
import styles from "./RecipePage.module.css";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  recipeId: string;
};

/**
 * Page détail d'une recette.
 *
 * Récupère la recette via `useRecipe(recipeId)` et gère les trois états :
 * - `loading` → skeleton / spinner
 * - `error`   → message d'erreur avec lien retour
 * - `success` → affichage complet (hero, méta, ingrédients, étapes)
 *
 * États visuels du hero :
 * - Image disponible : photo en cover avec gradient overlay
 * - Image manquante  : fond surface-sunken + emoji centré
 */
export function RecipePage({ recipeId }: Props) {
  const state = useRecipe(recipeId);

  /* ── État chargement ── */
  if (state.status === "loading") {
    return (
      <div className={styles.page}>
        <div className={[styles.hero, styles.heroSkeleton].join(" ")} />
        <div className={styles.content}>
          <div className={styles.skeletonMeta} />
          <div className={styles.skeletonBlock} />
          <div className={styles.skeletonBlock} />
        </div>
      </div>
    );
  }

  /* ── État erreur ── */
  if (state.status === "error") {
    return (
      <ErrorState
        title="Recette introuvable"
        message={state.message}
        actionLabel="Retour aux recettes"
        actionHref="/recipes"
      />
    );
  }

  const { recipe } = state;

  /** Temps total : préparation + cuisson */
  const totalTime = (recipe.preparationTime ?? 0) + (recipe.cookingTime ?? 0);

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.heroPlaceholder}>
            <span className={styles.heroEmoji}>🍽️</span>
          </div>
        )}
        <div className={styles.heroOverlay} />

        <Link href="/recipes" className={styles.back}>
          <TbArrowLeft />
          <span>Retour</span>
        </Link>

        <h1 className={styles.heroTitle}>{recipe.name}</h1>
      </div>

      {/* ── Contenu ── */}
      <div className={styles.content}>
        {/* ── Méta-infos ── */}
        <div className={styles.meta}>
          {recipe.preparationTime != null && recipe.preparationTime > 0 && (
            <div className={styles.metaItem}>
              <TbClock className={styles.metaIcon} />
              <span className={styles.metaLabel}>Préparation</span>
              <span className={styles.metaValue}>
                {recipe.preparationTime} min
              </span>
            </div>
          )}
          {recipe.cookingTime != null && recipe.cookingTime > 0 && (
            <div className={styles.metaItem}>
              <TbFlame className={styles.metaIcon} />
              <span className={styles.metaLabel}>Cuisson</span>
              <span className={styles.metaValue}>{recipe.cookingTime} min</span>
            </div>
          )}
          {recipe.servings != null && (
            <div className={styles.metaItem}>
              <TbUsers className={styles.metaIcon} />
              <span className={styles.metaLabel}>Portions</span>
              <span className={styles.metaValue}>{recipe.servings}</span>
            </div>
          )}
          {totalTime > 0 && (
            <div className={[styles.metaItem, styles.metaItemTotal].join(" ")}>
              <span className={styles.metaLabel}>Total</span>
              <span className={styles.metaValue}>{totalTime} min</span>
            </div>
          )}
        </div>

        {/* ── Description ── */}
        {recipe.description && (
          <section className={styles.section}>
            <Text className={styles.description}>{recipe.description}</Text>
          </section>
        )}

        {/* ── Ingrédients ── */}
        {recipe.ingredients.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Ingrédients</h2>
            <ul className={styles.ingredientList}>
              {recipe.ingredients.map((ing) => (
                <li key={ing.id} className={styles.ingredientItem}>
                  <span className={styles.ingredientName}>{ing.name}</span>
                  {(ing.quantity != null || ing.unit) && (
                    <span className={styles.ingredientQty}>
                      {ing.quantity != null ? ing.quantity : ""}
                      {ing.unit ? ` ${ing.unit}` : ""}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Étapes ── */}
        {recipe.steps.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Préparation</h2>
            <ol className={styles.stepList}>
              {[...recipe.steps]
                .sort((a, b) => a.position - b.position)
                .map((step, i) => (
                  <li key={step.id} className={styles.stepItem}>
                    <span className={styles.stepNumber}>{i + 1}</span>
                    <p className={styles.stepInstruction}>{step.instruction}</p>
                  </li>
                ))}
            </ol>
          </section>
        )}

        {/* ── Auteur ── */}
        <footer className={styles.author}>
          <Text className={styles.authorText}>
            Recette ajoutée par <strong>{recipe.user.userName}</strong>
          </Text>
        </footer>
      </div>
    </div>
  );
}
