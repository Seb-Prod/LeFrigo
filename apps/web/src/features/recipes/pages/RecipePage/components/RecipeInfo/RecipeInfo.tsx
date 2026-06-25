import styles from "./RecipeInfo.module.css";
import { MetaItem } from "@/features/recipes/components";

type Props = {
  preparationTime: number | null;
  cookingTime: number | null;
  servings: number | null;
  /** Si `true`, affiche un squelette animé à la place du contenu réel */
  isSkeleton?: boolean;
};

/**
 * Bandeau des métadonnées chiffrées d'une recette.
 *
 * Affiche en deux lignes les cinq indicateurs clés : préparation, repos,
 * cuisson (ligne 1) — total et portions (ligne 2). Le temps total est
 * calculé localement depuis `preparationTime` et `cookingTime`.
 * Supporte un mode squelette via `isSkeleton` pour les états de chargement.
 *
 * @remarks
 * - Les valeurs nulles ou nulles après coercition affichent "-" via `MetaItem`.
 * - Le champ `rest` n'est pas encore exposé par l'API — il est passé
 *   à `null` en attendant son implémentation.
 * - Le squelette reproduit fidèlement la grille deux lignes (3 + 2 items).
 *
 * @example
 * <RecipeInfo preparationTime={30} cookingTime={45} servings={4} />
 */
export function RecipeInfo({
  preparationTime,
  cookingTime,
  servings,
  isSkeleton,
}: Props) {
  /* ── Mode squelette ── */

  if (isSkeleton) {
    return (
      <div className={styles.skeletonMeta}>
        {/* ── Ligne 1 : 3 items ── */}
        <div className={styles.skeletonLine}>
          <div className={styles.skeletonItem} />
          <div className={styles.skeletonItem} />
          <div className={styles.skeletonItem} />
        </div>

        {/* ── Ligne 2 : 2 items ── */}
        <div className={styles.skeletonLine}>
          <div className={styles.skeletonItem} />
          <div className={styles.skeletonItem} />
        </div>
      </div>
    );
  }

  /* ── Calculs dérivés ── */

  /** Somme préparation + cuisson, utilisée par la cellule `total` */
  const totalTime = (preparationTime ?? 0) + (cookingTime ?? 0);

  return (
    <div className={styles.meta}>
      {/* ── Ligne 1 : préparation, repos, cuisson ── */}
      <div className={styles.ligne}>
        <MetaItem
          recipeMeta="preparation"
          value={
            preparationTime != null && preparationTime > 0
              ? preparationTime
              : null
          }
        />

        {/* Repos non encore exposé par l'API */}
        <MetaItem recipeMeta="rest" value={null} />

        <MetaItem
          recipeMeta="cooking"
          value={cookingTime != null && cookingTime > 0 ? cookingTime : null}
        />
      </div>

      {/* ── Ligne 2 : total, portions ── */}
      <div className={styles.ligne}>
        <MetaItem recipeMeta="total" value={totalTime > 0 ? totalTime : null} />
        <MetaItem recipeMeta="serving" value={servings ?? null} />
      </div>
    </div>
  );
}