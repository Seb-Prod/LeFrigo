"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TbSearch, TbX } from "react-icons/tb";
import { Input } from "../Input";
import type { IngredientSuggestion } from "@/features/recipes/services/recipe.service";
import styles from "./IngredientAutocomplete.module.css";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  value: string;
  suggestions: IngredientSuggestion[];
  loading?: boolean;
  onChange: (value: string) => void;
  /** Appelé quand l'utilisateur choisit un nom — existant ou nouveau */
  onPick: (name: string) => void;
  error?: boolean;
  placeholder?: string;
};

/**
 * Champ de recherche d'ingrédients avec dropdown d'autocomplete.
 *
 * États visuels :
 * - Fermé      → simple input avec icône loupe
 * - Ouvert     → dropdown avec suggestions + option "Créer X"
 * - Chargement → message dans le dropdown
 *
 * Comportements :
 * - `onPick` est appelé avec le nom sélectionné — le parent gère la suite
 * - Fermeture au clic extérieur et à l'échap
 */
export function IngredientAutocomplete({
  value,
  suggestions,
  loading,
  onChange,
  onPick,
  error,
  placeholder = "Rechercher un ingrédient...",
}: Props) {
  const [open, setOpen]   = useState(false);
  const wrapperRef        = useRef<HTMLDivElement>(null);

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

  /* ── Handlers ── */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setOpen(true);
  };

  const handlePick = useCallback((name: string) => {
    onPick(name);
    setOpen(false);
  }, [onPick]);

  const handleClear = () => {
    onChange("");
    setOpen(false);
  };

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

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
          {loading && (
            <li className={styles.state}>Recherche en cours...</li>
          )}

          {!loading && suggestions.map((ingredient) => (
            <li
              key={ingredient.id}
              role="option"
              aria-selected={false}
              className={styles.option}
              onMouseDown={() => handlePick(ingredient.name)}
            >
              {ingredient.name}
            </li>
          ))}

          {!loading && value.trim() && (
            <li
              role="option"
              aria-selected={false}
              className={[styles.option, styles.create].join(" ")}
              onMouseDown={() => handlePick(value.trim())}
            >
              + Créer &quot;{value.trim()}&quot;
            </li>
          )}
        </ul>
      )}
    </div>
  );
}