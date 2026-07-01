import { ButtonNext, ButtonPrev } from "@/components/ui";
import styles from "./Pagination.module.css";
import { getVisiblePages } from "./helpers/getVisiblePages";
import { useDevice } from "@/contexts/device.context";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Nombre de pages affichées de chaque côté de la page courante.
   *  Si omis, calculé automatiquement selon `isMobile`. */
  siblingCount?: number;
  /** Nombre de pages toujours visibles au début et à la fin.
   *  Si omis, calculé automatiquement selon `isMobile`. */
  boundaryCount?: number;
};

/**
 * Pagination — précédent / suivant + numéros de page avec ellipses.
 *
 * États visuels clés :
 * - bouton "précédent" désactivé sur la première page ;
 * - bouton "suivant" désactivé sur la dernière page ;
 * - page courante mise en évidence via `styles.active`.
 *
 * Comportement dynamique :
 * - `siblingCount` / `boundaryCount` pilotent le nombre de boutons visibles ;
 *   en l'absence de valeur explicite, le composant se resserre automatiquement
 *   sur mobile (`isMobile`) pour éviter le débordement horizontal.
 * - les props explicites priment toujours sur la valeur déduite de `isMobile`.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount,
  boundaryCount,
}: Props) {
  const { isMobile } = useDevice();

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  /** Sur mobile : pas de voisins autour de la page courante, pour limiter
   *  le nombre total de boutons affichés (largeur d'écran réduite). */
  const effectiveSiblingCount = siblingCount ?? (isMobile ? 0 : 1);
  /** Sur mobile comme sur desktop : première et dernière page toujours visibles. */
  const effectiveBoundaryCount = boundaryCount ?? 1;

  const pages = getVisiblePages(
    currentPage,
    totalPages,
    effectiveSiblingCount,
    effectiveBoundaryCount,
  );

  return (
    <div className={styles.pagination}>
      <ButtonPrev
        variant="primary"
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.navButton}
      />

      {/* ── Numéros de page ── */}
      <div className={styles.pages}>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={[
                styles.pageButton,
                page === currentPage ? styles.active : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <ButtonNext
        variant="primary"
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.navButton}
      />
    </div>
  );
}