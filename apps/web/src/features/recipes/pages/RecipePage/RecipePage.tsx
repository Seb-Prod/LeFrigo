"use client";

import { ErrorState, Surface, Text } from "@/components/ui";
import { useRecipe } from "@/features/recipes/hooks/useRecipe";
import styles from "./RecipePage.module.css";
import {
  RecipeDescription,
  RecipeHero,
  RecipeInfo,
  RecipeIngredients,
} from "./components";
import { getRandomDevImage } from "@/helpers/getRandomDevImage";

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
  const imageSrc = recipe.imageUrl || getRandomDevImage();

  return (
    <Surface fullScreen>
      <RecipeHero imageUrl={imageSrc} name={recipe.name} />
      <RecipeInfo
        preparationTime={recipe.preparationTime}
        cookingTime={recipe.cookingTime}
        servings={recipe.servings}
      />
      <RecipeDescription description={recipe.description} />
      <div>
        <RecipeIngredients
          ingredients={recipe.ingredients}
          servings={recipe.servings}
        />
      </div>

      {/* ── Contenu ── */}
      <div className={styles.content}>
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
    </Surface>
  );
}
