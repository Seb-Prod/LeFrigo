import { ComponentProps, useEffect, useState } from "react";
import { Button, InputSearch, Modal, RangeSlider, Row } from "@/components/ui";
import { RecipeFilters } from "@lefrigo/shared";

/* ── Types ─────────────────────────────────────────────────── */

/** Clés de `RecipeFilters` pilotables via un `RangeSlider` numérique. */
type NumericFilterKey =
  | "maxPreparationTime"
  | "maxCookingTime"
  | "maxTotalTime";

type Props = Omit<ComponentProps<typeof Modal>, "children"> & {
  filters: RecipeFilters;
  onApply: (filters: RecipeFilters) => void;
};

/* ── Composant ─────────────────────────────────────────────── */

/**
 * Modale de filtrage du catalogue de recettes.
 *
 * @remarks
 * Maintient un état local (`localFilters`) synchronisé sur `filters`
 * à chaque ouverture/mise à jour externe, pour permettre à l'utilisateur
 * d'ajuster les filtres sans impacter le catalogue avant validation.
 * Le clic sur "Appliquer" propage `localFilters` via `onApply`, tandis
 * que "Réinitialiser" vide l'état local sans le propager.
 */
export function FilterModal({ filters, onApply, ...modalProps }: Props) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [lastFilters, setLastFilters] = useState(filters);

  if (filters !== lastFilters) {
    setLastFilters(filters);
    setLocalFilters(filters);
  }

  /** Configuration des sliders numériques (clé, libellé, borne max). */
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

  return (
    <Modal {...modalProps}>
      {/* ── Recherche ── */}
      <InputSearch
        value={localFilters.search}
        onChange={(e) =>
          setLocalFilters((prev) => ({
            ...prev,
            search: e.target.value || undefined,
          }))
        }
      />

      {/* ── Filtres numériques ── */}
      <div>
        {NUMERIC_FILTER_INPUTS.map(({ key, label, max }) => (
          <RangeSlider
            key={key}
            label={label}
            min={0}
            max={max}
            value={localFilters[key] ?? max}
            onChange={(value) =>
              setLocalFilters((prev) => ({
                ...prev,
                [key]: value,
              }))
            }
          />
        ))}
      </div>

      {/* ── Actions ── */}
      <Row justify="spaceBetween">
        <Button variant="ghost" onClick={() => setLocalFilters({})}>
          Réinitialiser
        </Button>

        <Button onClick={() => onApply(localFilters)}>Appliquer</Button>
      </Row>
    </Modal>
  );
}