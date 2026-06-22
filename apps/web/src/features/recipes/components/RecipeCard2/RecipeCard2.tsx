import { SafeRecipeSummary } from "@lefrigo/shared";
import { TbClock, TbUsers } from "react-icons/tb";
import Link from "next/link";
import styles from "./RecipeCard.module.css";

type Props = {
  recipe: SafeRecipeSummary;
};

/**
 * Carte de recette pour les listes.
 *
 * Affiche : nom, description, temps de cuisson, portions, auteur.
 */
export function RecipeCard2({ recipe }: Props) {
  const totalTime = (recipe.preparationTime ?? 0) + (recipe.cookingTime ?? 0);

  return (
    <Link href={`/recipes/${recipe.id}`} className={styles.card}>
      {/* ── Nom ── */}
      <h3 className={styles.name}>{recipe.name}</h3>

      {/* ── Description ── */}
      {recipe.description && (
        <p className={styles.description}>{recipe.description}</p>
      )}

      {/* ── Métadonnées ── */}
      <div className={styles.meta}>
        {totalTime > 0 && (
          <span className={styles.metaItem}>
            <TbClock aria-hidden="true" />
            {totalTime} min
          </span>
        )}
        {recipe.servings && (
          <span className={styles.metaItem}>
            <TbUsers aria-hidden="true" />
            {recipe.servings} pers.
          </span>
        )}
      </div>

      {/* ── Auteur ── */}
      <p className={styles.author}>par {recipe.user.userName}</p>
    </Link>
  );
}