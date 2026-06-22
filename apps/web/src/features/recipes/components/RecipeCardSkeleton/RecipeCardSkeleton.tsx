import styles from "./RecipeCardSkeleton.module.css";

/**
 * Skeleton de RecipeCard — simule la forme du composant pendant le chargement.
 * Pas de contenu réel — uniquement des blocs animés.
 */
export function RecipeCardSkeleton() {
  return (
    <div className={styles.card}>
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