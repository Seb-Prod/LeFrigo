"use client";

import { ErrorState, Surface } from "@/components/ui";
import { useRecipe } from "@/features/recipes/hooks/useRecipe";
import styles from "./RecipePage.module.css";
import {
  RecipeAuthor,
  RecipeDescription,
  RecipeHero,
  RecipeInfo,
  RecipeIngredients,
  RecipeSkeleton,
  RecipeSteps,
} from "./components";
import type { RecipeStatus } from "./components/RecipeAuthor/RecipeAuthor";
import { getRandomDevImage } from "@/helpers/getRandomDevImage";

type Props = {
  recipeId: string;
};

/**
 * Page détail d'une recette.
 *
 * Récupère la recette via `useRecipe(recipeId)` et orchestre l'affichage
 * selon trois états :
 * - `loading` → squelettes de chargement
 * - `error`   → message d'erreur avec lien retour vers `/recipes`
 * - `success` → affichage complet : hero, métadonnées, description,
 *               ingrédients + étapes en deux colonnes, footer auteur
 *
 * @remarks
 * `imageUrl` manquant est remplacé par une image de développement aléatoire
 * via `getRandomDevImage` — à retirer en production.
 *
 * @example
 * <RecipePage recipeId="clx123abc" />
 */
export function RecipePage({ recipeId }: Props) {
  const state = useRecipe(recipeId);

  /* ── État chargement ── */
  if (state.status === "loading") {
    return (
      <RecipeSkeleton/>
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

  /* ── État succès ── */
  const { recipe } = state;

  /** Fallback image de dev si l'API ne renvoie pas d'URL */
  const imageSrc = recipe.imageUrl || getRandomDevImage();

  /** Cast explicite : l'API renvoie un string, RecipeStatus affine le type */
  const status = recipe.status as RecipeStatus;

  return (
    <Surface fullScreen>
      {/* ── Hero ── */}
      <RecipeHero imageUrl={imageSrc} name={recipe.name} />

      {/* ── Métadonnées chiffrées ── */}
      <RecipeInfo
        preparationTime={recipe.preparationTime}
        cookingTime={recipe.cookingTime}
        servings={recipe.servings}
      />

      {/* ── Description ── */}
      <RecipeDescription description={recipe.description} />

      {/* ── Ingrédients + étapes ── */}
      <div className={styles.ligne}>
        <RecipeIngredients
          ingredients={recipe.ingredients}
          servings={recipe.servings}
        />
        <RecipeSteps steps={recipe.steps} />
      </div>

      {/* ── Footer auteur ── */}
      <RecipeAuthor
        userName={recipe.user.userName}
        status={status}
        createdAt={recipe.createdAt}
        updatedAt={recipe.updatedAt}
      />
    </Surface>
  );
}