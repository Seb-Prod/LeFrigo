"use client";

import { useState, useEffect, useCallback } from "react";
import { TbTrash } from "react-icons/tb";
import { FormCard, Input, Button } from "@/components/ui";
import { IngredientAutocomplete } from "@/components/ui/IngredientAutocomplete";
import { useDebounce } from "@/hooks";
import { recipeService, IngredientSuggestion } from "@/features/recipes/services/recipe.service";
import type { RecipeIngredientDto, RecipeIngredientsDto } from "@lefrigo/shared";
import { recipeIngredientsSchema, zodErrorsToRecord } from "@lefrigo/shared";
import { useFormErrors } from "@/hooks";
import styles from "./RecipeFormStep2.module.css";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  defaultValues: Partial<RecipeIngredientsDto>;
  onSubmit: (data: RecipeIngredientsDto) => void;
  onBack: () => void;
};

/** Ingrédient en cours de saisie dans le formulaire d'ajout */
type DraftIngredient = {
  name:     string;
  quantity: string; /* string pour l'input, converti en number à la soumission */
  unit:     string;
};

const INITIAL_DRAFT: DraftIngredient = {
  name:     "",
  quantity: "",
  unit:     "",
};

/**
 * Étape 2 du formulaire de création de recette.
 *
 * Permet d'ajouter des ingrédients via autocomplete (existants ou créés à la volée).
 * Chaque ingrédient ajouté apparaît dans une liste avec possibilité de suppression.
 * Valide via `recipeIngredientsSchema` avant d'appeler `onSubmit`.
 */
export function RecipeFormStep2({ defaultValues, onSubmit, onBack }: Props) {
  const [ingredients, setIngredients] = useState<RecipeIngredientDto[]>(
    defaultValues.ingredients ?? [],
  );
  const [draft, setDraft]             = useState<DraftIngredient>(INITIAL_DRAFT);
  const [suggestions, setSuggestions] = useState<IngredientSuggestion[]>([]);
  const [searching, setSearching]     = useState(false);

  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /* ── Autocomplete ── */

  const debouncedQuery = useDebounce(draft.name, 300);

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
    return () => { cancelled = true; };
  }, [debouncedQuery]);

  /* ── Ajout d'un ingrédient ── */

  /** Ajoute l'ingrédient courant à la liste et réinitialise le draft. */
  const addIngredient = useCallback((name: string) => {
    if (!name.trim()) return;

    setIngredients((prev) => [
      ...prev,
      {
        name:     name.trim(),
        quantity: draft.quantity ? Number(draft.quantity) : undefined,
        unit:     draft.unit.trim() || undefined,
      },
    ]);

    setDraft(INITIAL_DRAFT);
    setSuggestions([]);
    clearFieldError("ingredients");
  }, [draft, clearFieldError]);

  const handleSelect = useCallback(
    (ingredient: IngredientSuggestion) => addIngredient(ingredient.name),
    [addIngredient],
  );

  const handleCreate = useCallback(
    (name: string) => addIngredient(name),
    [addIngredient],
  );

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
      description="Ajoutez les ingrédients de votre recette."
      buttonLabel="Suivant"
      onSubmit={handleSubmit}
      errorMessages={errorMessages}
    >
      {/* ── Formulaire d'ajout ── */}
      <div className={styles.addRow}>
        <IngredientAutocomplete
          value={draft.name}
          suggestions={suggestions}
          loading={searching}
          onChange={(value) => setDraft((prev) => ({ ...prev, name: value }))}
          onSelect={handleSelect}
          onCreate={handleCreate}
          error={!!errors.ingredients}
        />
        <Input
          type="number"
          placeholder="Quantité"
          value={draft.quantity}
          onChange={(e) => setDraft((prev) => ({ ...prev, quantity: e.target.value }))}
          className={styles.quantity}
        />
        <Input
          placeholder="Unité (g, ml…)"
          value={draft.unit}
          onChange={(e) => setDraft((prev) => ({ ...prev, unit: e.target.value }))}
          className={styles.unit}
        />
      </div>

      {/* ── Liste des ingrédients ajoutés ── */}
      {ingredients.length > 0 && (
        <ul className={styles.list}>
          {ingredients.map((ingredient, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.name}>{ingredient.name}</span>
              {ingredient.quantity && (
                <span className={styles.meta}>
                  {ingredient.quantity}{ingredient.unit ? ` ${ingredient.unit}` : ""}
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