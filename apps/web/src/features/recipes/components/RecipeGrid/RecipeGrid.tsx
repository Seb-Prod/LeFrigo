import { SafeRecipeSummary } from "@lefrigo/shared";
import { RecipeCardSkeleton } from "../cards/RecipeCardSkeleton";
import { RecipeCard } from "../cards/RecipeCard";
import styles from "./RecipeGrid.module.css";

type Props = {
  recipes: SafeRecipeSummary[];
  isLoading: boolean;
  hasError: boolean;
};

/** Nombre de cartes considérées "above the fold" — seules celles-ci
 *  reçoivent `priority` pour précharger leur image. */
const PRIORITY_CARD_COUNT = 4;

/**
 * Grille de recettes — gère les états chargement / erreur / vide, puis
 * affiche les cartes recette ou leurs skeletons.
 *
 * États visuels :
 * - Chargement : 10 `RecipeCardSkeleton`
 * - Erreur ou liste vide : rien n'est rendu (`null`)
 * - Contenu disponible : grille de `RecipeCard`
 */
export function RecipeGrid({ recipes, isLoading, hasError }: Props) {
  /* ── Gestion des états sans contenu ─────────────────────── */

  if (hasError || (!isLoading && recipes.length === 0)) {
    return null;
  }

  return (
    <div className={styles.grid}>
      {/* ── Cartes ── */}
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))
        : recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              priority={index < PRIORITY_CARD_COUNT}
            />
          ))}
    </div>
  );
}