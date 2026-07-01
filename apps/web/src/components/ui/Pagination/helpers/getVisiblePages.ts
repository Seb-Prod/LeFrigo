/**
 * Génère la liste des pages à afficher dans la pagination.
 *
 * Utilise un algorithme à largeur constante : le nombre total de boutons
 * affichés (hors ellipses) reste stable quelle que soit la position de
 * `currentPage`. Quand il n'y a pas assez de place pour une ellipse d'un
 * côté, le budget de pages qui lui était réservé est reporté de l'autre
 * côté plutôt que d'être perdu.
 *
 * Affiche toujours :
 * - les premières pages (`boundaryCount`) ;
 * - les dernières pages (`boundaryCount`) ;
 * - les pages autour de la page courante (`siblingCount`) ;
 * - des points de suspension lorsque des pages sont masquées.
 *
 * Exemples (siblingCount = 1, boundaryCount = 1) :
 *
 * currentPage = 1, totalPages = 10
 * → [1, 2, 3, 4, 5, 6, "...", 10]
 *
 * currentPage = 5, totalPages = 10
 * → [1, "...", 4, 5, 6, "...", 10]
 *
 * currentPage = 10, totalPages = 10
 * → [1, "...", 5, 6, 7, 8, 9, 10]
 *
 * @param currentPage Page courante (commence à 1).
 * @param totalPages Nombre total de pages.
 * @param siblingCount Nombre de pages affichées de chaque côté de la page courante.
 * @param boundaryCount Nombre de pages toujours visibles au début et à la fin (doit être ≥ 1).
 */
export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
  boundaryCount = 1,
): (number | "...")[] {
  if (totalPages <= 0) return [];

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // Nombre de boutons affichés quand aucun décalage n'est nécessaire
  const totalPageNumbers = siblingCount * 2 + boundaryCount * 2 + 3;

  // Toutes les pages tiennent dans la pagination
  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(
    currentPage - siblingCount,
    boundaryCount + 2,
  );
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPages - boundaryCount - 1,
  );

  const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - boundaryCount - 1;

  // ── Pas d'ellipse à gauche : le budget restant est reporté à droite ──

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = boundaryCount + siblingCount * 2 + 3;
    return [
      ...range(1, leftItemCount),
      "...",
      ...range(totalPages - boundaryCount + 1, totalPages),
    ];
  }

  // ── Pas d'ellipse à droite : le budget restant est reporté à gauche ──

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = boundaryCount + siblingCount * 2 + 3;
    return [
      ...range(1, boundaryCount),
      "...",
      ...range(totalPages - rightItemCount + 1, totalPages),
    ];
  }

  // ── Ellipses des deux côtés ──

  return [
    ...range(1, boundaryCount),
    "...",
    ...range(leftSiblingIndex, rightSiblingIndex),
    "...",
    ...range(totalPages - boundaryCount + 1, totalPages),
  ];
}