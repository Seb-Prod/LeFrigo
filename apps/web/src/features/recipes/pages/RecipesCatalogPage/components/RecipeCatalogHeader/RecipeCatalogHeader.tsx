/* ── Types ─────────────────────────────────────────────────── */

import { RecipeFilters } from "@lefrigo/shared";

type Props = {
  /** Filtres initiaux transmis depuis les search params de l'URL. */
  initialFilters?: RecipeFilters;
};

export function RecipeCatalogHeader({ initialFilters }: Props) {
  return <div>hhh{initialFilters?.maxTotalTime}</div>;
}
