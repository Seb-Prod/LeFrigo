import { SafeRecipeSummary } from "@lefrigo/shared";
import { RecipeCardSkeleton } from "../cards/RecipeCardSkeleton";
import { RecipeCard } from "../cards/RecipeCard";
import styles from "./RecipeGrid.module.css";

type Props = {
  recipes: SafeRecipeSummary[];
  isLoading: boolean;
  hasError: boolean;
};

export function RecipeGrid({ recipes, isLoading, hasError }: Props) {
  /* ── Gestion des états sans contenu ─────────────────────── */

  if (hasError || (!isLoading && recipes.length === 0)) {
    return null;
  }

  return (
    <div className={styles.grid}>
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <RecipeCardSkeleton  key={i} />
          ))
        : recipes.map((recipe) => (
            <RecipeCard  key={recipe.id} recipe={recipe} />
          ))}
    </div>
  );
}
