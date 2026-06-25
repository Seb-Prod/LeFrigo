import styles from "./RecipeInfo.module.css";
import { MetaItem } from "@/features/recipes/components";

type Props = {
  preparationTime: number | null;
  cookingTime: number | null;
  servings: number | null;
};

/**
 * Bandeau des métadonnées chiffrées d'une recette.
 *
 * Affiche en grille les cinq indicateurs clés : préparation, repos,
 * cuisson, total et portions. Le temps total est calculé localement
 * depuis `preparationTime` et `cookingTime`. Les valeurs nulles ou
 * nulles après coercition affichent "-" via `MetaItem`.
 *
 * @remarks
 * Le champ `rest` n'est pas encore exposé par l'API — il est passé
 * à `null` en attendant son implémentation.
 *
 * @example
 * <RecipeInfo preparationTime={30} cookingTime={45} servings={4} />
 */
export function RecipeInfo({ preparationTime, cookingTime, servings }: Props) {
  /* ── Calculs dérivés ── */

  /** Somme préparation + cuisson, utilisée par la cellule `total` */
  const totalTime = (preparationTime ?? 0) + (cookingTime ?? 0);

  return (
    <div className={styles.meta}>
      <div className={styles.ligne}>
        {/* ── Préparation ── */}
        <MetaItem
          recipeMeta="preparation"
          value={
            preparationTime != null && preparationTime > 0
              ? preparationTime
              : null
          }
        />

        {/* ── Repos (non encore exposé par l'API) ── */}
        <MetaItem recipeMeta="rest" value={null} />

        {/* ── Cuisson ── */}
        <MetaItem
          recipeMeta="cooking"
          value={cookingTime != null && cookingTime > 0 ? cookingTime : null}
        />
      </div>
      <div className={styles.ligne}>
        {/* ── Total ── */}
        <MetaItem recipeMeta="total" value={totalTime > 0 ? totalTime : null} />

        {/* ── Portions ── */}
        <MetaItem recipeMeta="serving" value={servings ?? null} />
      </div>
    </div>
  );
}
