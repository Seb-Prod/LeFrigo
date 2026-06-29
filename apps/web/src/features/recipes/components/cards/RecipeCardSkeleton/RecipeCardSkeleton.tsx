import styles from "./RecipeCardSkeleton.module.css";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  variant?: "grid" | "scroll";
};

/**
 * Skeleton de RecipeCard — simule la forme du composant pendant le chargement.
 *
 * @remarks
 * Doit recevoir le même `variant` que `RecipeCard` pour que les dimensions
 * des blocs animés correspondent exactement à la carte réelle.
 */
export function RecipeCardSkeleton({ variant = "grid" }: Props) {
  return (
    <div
      className={[styles.card, variant === "scroll" && styles.cardScroll]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Thumbnail ── */}
      <div className={styles.thumb} />

      {/* ── Infos ── */}
      <div className={styles.info}>
        <div className={styles.name} />
        <div className={styles.meta}>
          <div className={styles.metaItem} />
          <div className={styles.metaItem} />
        </div>
      </div>
    </div>
  );
}