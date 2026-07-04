"use client";

import { Button, RangeSlider, Row } from "@/components/ui";
import { InputSearch } from "@/components/ui/Input";
import {
  FilterKey,
  getRecipeFilterBadges,
} from "@/features/recipes/utils/recipeFilterBadges";
import type { RecipeFilters } from "@lefrigo/shared";
import { FiFilter } from "react-icons/fi";
import styles from "./RecipeCatalogHeader.module.css";

/* ── Types ─────────────────────────────────────────────────── */

type NumericFilterKey =
  | "maxPreparationTime"
  | "maxCookingTime"
  | "maxTotalTime";

type Props = {
  filters?: RecipeFilters;

  onRemoveFilter?: (key: FilterKey) => void;

  onNumericFilterChange?: (key: NumericFilterKey, value: string) => void;

  onSearchChange?: (value: string) => void;
};

/* ── Configuration ─────────────────────────────────────────── */

const NUMERIC_FILTER_INPUTS: {
  key: NumericFilterKey;
  label: string;
  max: number;
}[] = [
  {
    key: "maxPreparationTime",
    label: "Préparation max",
    max: 100,
  },

  {
    key: "maxCookingTime",
    label: "Cuisson max",
    max: 100,
  },

  {
    key: "maxTotalTime",
    label: "Temps total max",
    max: 100,
  },
];

/* ── Composant ─────────────────────────────────────────────── */

export function RecipeCatalogHeader({
  filters,
  onRemoveFilter,
  onNumericFilterChange,
  onSearchChange,
}: Props) {
  const badges = getRecipeFilterBadges(filters);

  return (
    <div>
      <Row gap="md" justify="spaceBetween">
        <InputSearch
          className={styles.input}
          placeholder="Rechercher une recette..."
          value={filters?.search ?? ""}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <Button icon={<FiFilter />} count={badges.length}>
          Filtres
        </Button>
      </Row>

      {/* ── Sliders ───────────────────────────────────────────
      <div>
        {NUMERIC_FILTER_INPUTS.map(({ key, label, max }) => (
          <RangeSlider
            key={key}
            label={label}
            min={0}
            max={max}
            value={filters?.[key] ?? max}
            onChange={(value) =>
              onNumericFilterChange?.(key, String(value))
            }
          />
        ))}
      </div> */}

      {/* ── Badges ──────────────────────────────────────────── */}
      <div>
        {badges.map(({ key, label }) => (
          <Button key={key} onClick={() => onRemoveFilter?.(key)}>
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
