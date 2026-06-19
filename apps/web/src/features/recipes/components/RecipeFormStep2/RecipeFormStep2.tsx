"use client";

import { useState, useEffect, useCallback } from "react";
import { TbTrash } from "react-icons/tb";
import { FormCard, Input, Button, InputNumber } from "@/components/ui";
import { IngredientAutocomplete } from "@/components/ui/IngredientAutocomplete";
import { useDebounce, useFormErrors } from "@/hooks";
import {
  recipeService,
  IngredientSuggestion,
} from "@/features/recipes/services/recipe.service";
import {
  recipeIngredientsSchema,
  RecipeIngredientDto,
  RecipeIngredientsDto,
  zodErrorsToRecord,
} from "@lefrigo/shared";
import styles from "./RecipeFormStep2.module.css";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  defaultValues: Partial<RecipeIngredientsDto>;
  onSubmit: (data: RecipeIngredientsDto) => void;
  onBack: () => void;
};

/** État du mini-formulaire de confirmation */
type PendingIngredient = {
  name: string;
  quantity: number | undefined;
  unit: string;
};

/**
 * Étape 2 du formulaire de création de recette.
 *
 * États visuels :
 * - `pending: null`    → autocomplete seul
 * - `pending: { name }` → mini-formulaire qts/unité sous l'autocomplete
 *
 * Flow :
 * 1. L'utilisateur tape → suggestions en dropdown
 * 2. Il clique une suggestion ou "Créer X" → mini-formulaire apparaît
 * 3. Il saisit qts/unité et confirme → ingrédient ajouté à la liste
 */
export function RecipeFormStep2({ defaultValues, onSubmit, onBack }: Props) {
  const [ingredients, setIngredients] = useState<RecipeIngredientDto[]>(
    defaultValues.ingredients ?? [],
  );
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<IngredientSuggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [pending, setPending] = useState<PendingIngredient | null>(null);

  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /* ── Autocomplete ── */

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;

    const search = async () => {
      setSearching(true);
      try {
        const results = await recipeService.searchIngredients(debouncedQuery);
        if (!cancelled) setSuggestions(results);
      } catch {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    };

    search();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  /* ── Sélection → mini-formulaire ── */

  const handlePick = useCallback((name: string) => {
    setPending({ name, quantity: 0, unit: "" });
    setQuery("");
    setSuggestions([]);
  }, []);

  /* ── Confirmation du mini-formulaire ── */

  const handleConfirm = useCallback(() => {
    if (!pending) return;

    setIngredients((prev) => [
      ...prev,
      {
        name: pending.name,
        quantity: pending.quantity ? Number(pending.quantity) : undefined,
        unit: pending.unit.trim() || undefined,
      },
    ]);

    setPending(null);
    clearFieldError("ingredients");
  }, [pending, clearFieldError]);

  const handleCancelPending = useCallback(() => {
    setPending(null);
  }, []);

  /* ── Suppression ── */

  const removeIngredient = useCallback((index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /* ── Submit ── */

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const result = recipeIngredientsSchema.safeParse({ ingredients });

    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      return;
    }

    onSubmit(result.data);
  };

  return (
    <FormCard
      icon={<span>🥕</span>}
      title="Ingrédients"
      description="Recherchez et ajoutez les ingrédients de votre recette."
      buttonLabel="Suivant"
      onSubmit={handleSubmit}
      errorMessages={errorMessages}
    >
      {/* ── Autocomplete ── */}
      {!pending && (
        <IngredientAutocomplete
          value={query}
          suggestions={suggestions}
          loading={searching}
          onChange={setQuery}
          onPick={handlePick}
          error={!!errors.ingredients}
        />
      )}

      {/* ── Mini-formulaire ── */}
      {pending && (
        <div className={styles.miniForm}>
          {/* ── Nom sélectionné ── */}
          <p className={styles.pendingName}>{pending.name}</p>

          {/* ── Quantité + unité ── */}
          <div className={styles.miniRow}>
            <InputNumber
              placeholder="Quantité"
              value={pending.quantity}
              min={0}
              onChange={(value) =>
                setPending((prev) =>
                  prev
                    ? {
                        ...prev,
                        quantity: value,
                      }
                    : null,
                )
              }
            />
            <Input
              placeholder="Unité (g, ml, pièce…)"
              value={pending.unit}
              onChange={(e) =>
                setPending((prev) => prev && { ...prev, unit: e.target.value })
              }
            />
          </div>

          {/* ── Actions ── */}
          <div className={styles.miniActions}>
            <Button type="button" variant="ghost" onClick={handleCancelPending}>
              Annuler
            </Button>
            <Button type="button" onClick={handleConfirm}>
              Confirmer
            </Button>
          </div>
        </div>
      )}

      {/* ── Liste des ingrédients ── */}
      {ingredients.length > 0 && (
        <ul className={styles.list}>
          {ingredients.map((ingredient, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.name}>{ingredient.name}</span>
              {ingredient.quantity && (
                <span className={styles.meta}>
                  {ingredient.quantity}
                  {ingredient.unit ? ` ${ingredient.unit}` : ""}
                </span>
              )}
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeIngredient(index)}
                aria-label={`Supprimer ${ingredient.name}`}
              >
                <TbTrash />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ── Retour ── */}
      <Button type="button" variant="ghost" onClick={onBack}>
        Retour
      </Button>
    </FormCard>
  );
}
