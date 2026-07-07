"use client";

import { Button, Chip, Row } from "@/components/ui";
import { InputSearch } from "@/components/ui/Input";
import { FiFilter } from "react-icons/fi";
import styles from "./SearchFilterBar.module.css";

/* ── Types ─────────────────────────────────────────────────── */

export type FilterChip = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
};

type Props = {
  search?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onOpenFilters?: () => void;
  chips?: FilterChip[];
  filterLabel?: string;
};

/* ── Composant ─────────────────────────────────────────────── */

export function SearchFilterBar({
  search = "",
  searchPlaceholder = "Rechercher...",
  onSearchChange,
  onOpenFilters,
  chips = [],
  filterLabel = "Filtres",
}: Props) {
  return (
    <div className={styles.container}>
      {/* ── Barre de recherche ─────────────────────────────── */}
      <Row gap="md" justify="spaceBetween">
        <InputSearch
          className={styles.input}
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />

        <Button
          icon={<FiFilter />}
          count={chips.length}
          onClick={onOpenFilters}
        >
          {filterLabel}
        </Button>
      </Row>

      {/* ── Chips actives ─────────────────────────────────── */}
      {chips.length > 0 && (
        <Row gap="sm" scroll>
          {chips.map((chip) => (
            <Chip key={chip.id} icon={chip.icon} removable>
              {chip.label}
            </Chip>
            // <Button
            //   key={chip.id}
            //   variant="soft"
            //   size="sm"
            //   onClick={chip.onRemove}
            // >
            //   {chip.label}
            // </Button>
          ))}
        </Row>
      )}
    </div>
  );
}
