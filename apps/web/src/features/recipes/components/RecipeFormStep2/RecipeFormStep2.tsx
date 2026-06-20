"use client";

import { useState, useCallback } from "react";
import { FormCard, Button } from "@/components/ui";
import { IngredientAutocomplete } from "@/components/ui/IngredientAutocomplete";
import { useFormErrors } from "@/hooks";
import {
  recipeIngredientsSchema,
  RecipeIngredientDto,
  RecipeIngredientsDto,
  zodErrorsToRecord,
} from "@lefrigo/shared";
import { PendingIngredientForm } from "./components/PendingIngredientForm";
import { IngredientList } from "./components";
import { useIngredientSearch } from "./hooks/useIngredientSearch";
import { usePendingIngredient } from "./hooks/usePendingIngredient";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  defaultValues: Partial<RecipeIngredientsDto>;
  onSubmit: (data: RecipeIngredientsDto) => void;
  onBack: () => void;
  stepper: React.ReactNode;
};

/**
 * Étape 2 du formulaire de création de recette.
 *
 * Délègue :
 * - la recherche d'ingrédients        → `useIngredientSearch`
 * - le cycle de vie du mini-formulaire → `usePendingIngredient`
 *
 * Gère localement :
 * - la liste confirmée (`ingredients`)
 * - la validation Zod au submit
 */
export function RecipeFormStep2({ defaultValues, onSubmit, onBack,stepper }: Props) {
  const [ingredients, setIngredients] = useState<RecipeIngredientDto[]>(
    defaultValues.ingredients ?? [],
  );

  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();
  const { query, setQuery, suggestions, searching, clearSuggestions } =
    useIngredientSearch();

  /* ── Commit : ajout ou mise à jour in place ── */

  const handleCommit = useCallback(
    (ingredient: RecipeIngredientDto, editingIndex: number | null) => {
      setIngredients((prev) =>
        editingIndex !== null
          ? prev.map((item, i) => (i === editingIndex ? ingredient : item))
          : [...prev, ingredient],
      );
    },
    [],
  );

  const {
    pending,
    editingIndex,
    openCreate,
    openEdit,
    patch,
    confirm,
    cancel,
  } = usePendingIngredient({
    onCommit: handleCommit,
    onClearError: () => clearFieldError("ingredients"),
  });

  /* ── Pick depuis l'autocomplete ── */

  const handlePick = useCallback(
    (name: string) => {
      openCreate(name);
      clearSuggestions();
    },
    [openCreate, clearSuggestions],
  );

  /* ── Suppression ── */

  const handleRemove = useCallback((index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /* ── Submit ── */

  const handleSubmit = (e: React.FormEvent) => {
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
      backLabel="Retour"
      onBack={onBack}
      onSubmit={handleSubmit}
      errorMessages={errorMessages}
      disabled={!!pending}
      stepper={stepper}
    >
      {/* ── Autocomplete — masqué pendant une édition ── */}
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

      {/* ── Mini-formulaire création ou édition ── */}
      {pending && (
        <PendingIngredientForm
          ingredient={pending}
          onChange={patch}
          onConfirm={confirm}
          onCancel={cancel}
        />
      )}

      {/* ── Liste des ingrédients ── */}
      <IngredientList
        ingredients={ingredients}
        editingIndex={editingIndex}
        onEdit={(index) => openEdit(ingredients[index], index)}
        onRemove={handleRemove}
        disabled={!!pending}
      />

    </FormCard>
  );
}
