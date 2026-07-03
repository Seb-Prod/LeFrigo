/* ── Types ─────────────────────────────────────────────────── */

import { Badge, Button } from "@/components/ui";
import { RecipeFilters } from "@lefrigo/shared";

type FilterKey = keyof RecipeFilters;

/** Clés de `RecipeFilters` pilotables via un input number de test. */
type NumericFilterKey = "maxPreparationTime" | "maxCookingTime" | "maxTotalTime";

type Props = {
  /** Filtres actuellement actifs. */
  filters?: RecipeFilters;
  /** Appelé avec la clé du filtre à retirer quand son badge est cliqué. */
  onRemoveFilter?: (key: FilterKey) => void;
  /** Appelé avec la clé du filtre numérique et la valeur brute de son input. */
  onNumericFilterChange?: (key: NumericFilterKey, value: string) => void;
};

/**
 * Config statique des inputs number de test : un tableau plutôt que des
 * inputs dupliqués, pour pouvoir en ajouter/retirer sans toucher au JSX.
 */
const NUMERIC_FILTER_INPUTS: { key: NumericFilterKey; label: string }[] = [
  { key: "maxPreparationTime", label: "Préparation max (test)" },
  { key: "maxCookingTime", label: "Cuisson max (test)" },
  { key: "maxTotalTime", label: "Temps total max (test)" },
];

/* ── Composant ─────────────────────────────────────────────── */

/**
 * En-tête du catalogue affichant, avant les badges de filtres actifs,
 * des inputs number de test pour les filtres temporels
 * (`maxPreparationTime`, `maxCookingTime`, `maxTotalTime`).
 *
 * @remarks
 * Chaque badge représente un filtre actif et est cliquable : le clic
 * retire ce filtre en appelant `onRemoveFilter` avec sa clé.
 * Les inputs number sont un outil de test temporaire pour faire varier
 * les filtres temporels sans passer par l'UI finale ; ils sont générés
 * depuis `NUMERIC_FILTER_INPUTS` pour rester faciles à étendre.
 */
export function RecipeCatalogHeader({
  filters,
  onRemoveFilter,
  onNumericFilterChange,
}: Props) {
  /** Liste des filtres actifs, associés à leur clé et à leur libellé affiché. */
  const badges: { key: FilterKey; label: string }[] = [];

  if (filters?.search) {
    badges.push({ key: "search", label: `Recherche : "${filters.search}"` });
  }

  if (filters?.maxPreparationTime) {
    badges.push({
      key: "maxPreparationTime",
      label: `Préparation ≤ ${filters.maxPreparationTime} min`,
    });
  }

  if (filters?.maxCookingTime) {
    badges.push({
      key: "maxCookingTime",
      label: `Cuisson ≤ ${filters.maxCookingTime} min`,
    });
  }

  if (filters?.maxTotalTime) {
    badges.push({
      key: "maxTotalTime",
      label: `Repas ≤ ${filters.maxTotalTime} min`,
    });
  }

  if (filters?.sort) {
    badges.push({ key: "sort", label: `Tri : ${filters.sort}` });
  }

  return (
    <div>
      {/* ── Inputs de test : filtres temporels ── */}
      <div>
        {NUMERIC_FILTER_INPUTS.map(({ key, label }) => (
          <div key={key}>
            <label htmlFor={`${key}-test-input`}>{label}</label>
            <input
              id={`${key}-test-input`}
              type="number"
              min={0}
              value={filters?.[key] ?? ""}
              onChange={(e) => onNumericFilterChange?.(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* ── Badges de filtres actifs ── */}
      {badges.map(({ key, label }) => (
        <Button key={key} onClick={() => onRemoveFilter?.(key)}>
          {label}
        </Button>
      ))}
    </div>
  );
}