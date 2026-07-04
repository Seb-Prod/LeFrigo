import type { RecipeFilters } from "@lefrigo/shared";

/* ── Types ─────────────────────────────────────────────────── */

export type FilterKey = keyof RecipeFilters;

export type RecipeFilterBadge = {
  key: FilterKey;
  label: string;
};

/* ── Configuration ─────────────────────────────────────────── */

const BADGE_CONFIG: {
  key: FilterKey;
  getLabel: (filters: RecipeFilters) => string | null;
}[] = [
  {
    key: "search",
    getLabel: (f) =>
      f.search ? `Recherche : "${f.search}"` : null,
  },

  {
    key: "maxPreparationTime",
    getLabel: (f) =>
      f.maxPreparationTime
        ? `Préparation ≤ ${f.maxPreparationTime} min`
        : null,
  },

  {
    key: "maxCookingTime",
    getLabel: (f) =>
      f.maxCookingTime
        ? `Cuisson ≤ ${f.maxCookingTime} min`
        : null,
  },

  {
    key: "maxTotalTime",
    getLabel: (f) =>
      f.maxTotalTime
        ? `Repas ≤ ${f.maxTotalTime} min`
        : null,
  },

  {
    key: "sort",
    getLabel: (f) =>
      f.sort ? `Tri : ${f.sort}` : null,
  },
];

/* ── Helpers ───────────────────────────────────────────────── */

export function getRecipeFilterBadges(
  filters?: RecipeFilters,
): RecipeFilterBadge[] {
  if (!filters) {
    return [];
  }

  return BADGE_CONFIG.flatMap(({ key, getLabel }) => {
    const label = getLabel(filters);

    return label ? [{ key, label }] : [];
  });
}