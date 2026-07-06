import { SearchFilterBar } from "@/components/ui/SearchFilterBar";
import {
  FilterKey,
  getRecipeFilterBadges,
} from "@/features/recipes/utils/recipeFilterBadges";
import type { RecipeFilters } from "@lefrigo/shared";

type NumericFilterKey =
  | "maxPreparationTime"
  | "maxCookingTime"
  | "maxTotalTime";

type Props = {
  filters?: RecipeFilters;
  onRemoveFilter?: (key: FilterKey) => void;
  onNumericFilterChange?: (
    key: NumericFilterKey,
    value: string,
  ) => void;
  onSearchChange?: (value: string) => void;
  onOpenFilters?: () => void;
};

export function RecipeCatalogHeader({
  filters,
  onRemoveFilter,
  onSearchChange,
  onOpenFilters,
}: Props) {
  const chips = getRecipeFilterBadges(filters).map((badge) => ({
    id: badge.key,
    label: badge.label,
    onRemove: () => onRemoveFilter?.(badge.key),
  }));

  return (
    <SearchFilterBar
      search={filters?.search}
      searchPlaceholder="Rechercher une recette..."
      onSearchChange={onSearchChange}
      onOpenFilters={onOpenFilters}
      chips={chips}
    />
  );
}