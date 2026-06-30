import styles from "./Pagination.module.css";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

/**
 * Pagination simple — précédent / suivant + numéro de page courante.
 */
export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className={styles.pagination}>
      <button
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.navButton}
      >
        Précédent
      </button>

      <span className={styles.pageInfo}>
        Page {currentPage} sur {totalPages}
      </span>

      <button
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.navButton}
      >
        Suivant
      </button>
    </div>
  );
}