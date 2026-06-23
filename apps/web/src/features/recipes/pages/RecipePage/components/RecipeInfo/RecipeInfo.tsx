import styles from "./RecipeInfo.module.css";
import { MetaItem } from "@/features/recipes/components";

type Props = {
  preparationTime: number | null;
  cookingTime: number | null;
  servings: number | null;
};

/**
 * Affiche les principales informations d'une recette
 * (temps de préparation, cuisson, temps total et portions).
 */
export function RecipeInfo({
  preparationTime,
  cookingTime,
  servings,
}: Props) {
  /* ── Calculs métier ───────────────────────────────────────── */

  const totalTime = (preparationTime ?? 0) + (cookingTime ?? 0);

  return (
    <div className={styles.meta}>
      {/* ── Temps de préparation ─────────────────────────────── */}

      <MetaItem
        recipeMeta="preparation"
        value={
          preparationTime != null && preparationTime > 0
            ? `${preparationTime} min`
            : null
        }
      />

      {/* ── Temps de repos (à implémenter) ──────────────────── */}

      {/* <MetaItem recipeMeta="rest" value={null} /> */}

      {/* ── Temps de cuisson ────────────────────────────────── */}

      <MetaItem
        recipeMeta="cooking"
        value={
          cookingTime != null && cookingTime > 0
            ? `${cookingTime} min`
            : null
        }
      />

      {/* ── Temps total de la recette ───────────────────────── */}

      <MetaItem
        recipeMeta="total"
        value={totalTime > 0 ? `${totalTime} min` : null}
      />

      {/* ── Nombre de portions ──────────────────────────────── */}

      <MetaItem
        recipeMeta="serving"
        value={servings != null ? servings.toString() : null}
      />
    </div>
  );
}