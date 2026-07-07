import type { RecipeFilters } from "@lefrigo/shared";
import { IconType } from "react-icons";
import { FiSliders } from "react-icons/fi";
import { TbChefHat, TbClockHour4, TbFlame, TbSearch } from "react-icons/tb";

/* ── Types ─────────────────────────────────────────────────── */

export type FilterKey = keyof RecipeFilters;

export type RecipeFilterBadge = {
  key: FilterKey;
  label: string;
  icon: IconType;
};

/* ── Configuration ─────────────────────────────────────────── */

const BADGE_CONFIG: {
  key: FilterKey;
  icon: IconType;
  getLabel: (filters: RecipeFilters) => string | null;
}[] = [
  {
    key: "search",
    icon: TbSearch,
    getLabel: (f) => (f.search ? f.search : null),
  },

  {
    key: "maxPreparationTime",
    icon: TbChefHat,
    getLabel: (f) =>
      f.maxPreparationTime ? `≤ ${f.maxPreparationTime} min` : null,
  },

  {
    key: "maxCookingTime",
    icon: TbFlame,
    getLabel: (f) =>
      f.maxCookingTime ? `≤ ${f.maxCookingTime} min` : null,
  },

  {
    key: "maxTotalTime",
    icon: TbClockHour4,
    getLabel: (f) => (f.maxTotalTime ? `≤ ${f.maxTotalTime} min` : null),
  },

  {
    key: "sort",
    icon: FiSliders,
    getLabel: (f) => (f.sort ? `Tri : ${f.sort}` : null),
  },
];

/* ── Helpers ───────────────────────────────────────────────── */

export function getRecipeFilterBadges(
  filters?: RecipeFilters,
): RecipeFilterBadge[] {
  if (!filters) {
    return [];
  }

  return BADGE_CONFIG.flatMap(({ key, icon, getLabel }) => {
    const label = getLabel(filters);

    return label ? [{ key, label, icon }] : [];
  });
}
