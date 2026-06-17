"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TbSearch, TbX } from "react-icons/tb";
import { Input } from "../Input";
import type { IngredientSuggestion } from "@/features/recipes/services/recipe.service";
import styles from "./IngredientAutocomplete.module.css";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  /** Valeur courante du champ de recherche */
  value: string;
  /** Suggestions retournées par l'API */
  suggestions: IngredientSuggestion[];
  /** Indique si une recherche est en cours */
  loading?: boolean;
  /** Appelé à chaque frappe */
  onChange: (value: string) => void;
  /** Appelé quand l'utilisateur sélectionne une suggestion existante */
  onSelect: (ingredient: IngredientSuggestion) => void;
  /** Appelé quand l'utilisateur confirme un nouvel ingrédient (non existant) */
  onCreate: (name: string) => void;
  error?: boolean;
  placeholder?: string;
};

/**
 * Champ de recherche d'ingrédients avec dropdown d'autocomplete.
 *
 * États visuels :
 * - Fermé       → simple input avec icône loupe
 * - Ouvert      → dropdown avec suggestions + option "Créer X"
 * - Chargement  → spinner dans le dropdown
 * - Vide        → option "Créer X" uniquement si la query est non vide
 *
 * Comportements :
 * - Fermeture au clic extérieur via `useRef` + listener `mousedown`
 * - Fermeture à l'échap
 * - `onSelect` pour un ingrédient existant, `onCreate` pour un nouveau
 */
export function IngredientAutocomplete({
  value,
  suggestions,
  loading,
  onChange,
  onSelect,
  onCreate,
  error,
  placeholder = "Rechercher un ingrédient...",
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Fermeture au clic extérieur ── */
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  /* ── Fermeture à l'échap ── */
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  /* ── Handlers ── */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setOpen(true);
  };

  const handleSelect = (ingredient: IngredientSuggestion) => {
    onSelect(ingredient);
    setOpen(false);
  };

  const handleCreate = () => {
    onCreate(value.trim());
    setOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setOpen(false);
  };

  /** Dropdown visible si ouvert et query non vide */
  const showDropdown = open && value.trim().length > 0;

  return (
    <div ref={wrapperRef} className={styles.wrapper} onKeyDown={onKeyDown}>
      {/* ── Input ── */}
      <Input
        value={value}
        onChange={handleChange}
        onFocus={() => value.trim() && setOpen(true)}
        placeholder={placeholder}
        error={error}
        iconLeft={<TbSearch />}
        iconRight={
          value ? (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              aria-label="Effacer"
            >
              <TbX />
            </button>
          ) : undefined
        }
      />

      {/* ── Dropdown ── */}
      {showDropdown && (
        <ul className={styles.dropdown} role="listbox">
          {/* ── Chargement ── */}
          {loading && (
            <li className={styles.state}>Recherche en cours...</li>
          )}

          {/* ── Suggestions ── */}
          {!loading && suggestions.map((ingredient) => (
            <li
              key={ingredient.id}
              role="option"
              aria-selected={false}
              className={styles.option}
              onMouseDown={() => handleSelect(ingredient)}
            >
              {ingredient.name}
            </li>
          ))}

          {/* ── Créer à la volée ── */}
          {!loading && (
            <li
              role="option"
              aria-selected={false}
              className={[styles.option, styles.create].join(" ")}
              onMouseDown={handleCreate}
            >
              + Créer &quot;{value.trim()}&quot;
            </li>
          )}
        </ul>
      )}
    </div>
  );
}