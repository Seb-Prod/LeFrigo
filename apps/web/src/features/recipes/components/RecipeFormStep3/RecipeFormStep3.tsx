"use client";

import { useState, useCallback } from "react";
import { TbPlus, TbPencilPlus } from "react-icons/tb";
import { FormCard, Button, TextArea } from "@/components/ui";
import { useFormErrors } from "@/hooks";
import {
  recipeStepsSchema,
  RecipeStepsDto,
  zodErrorsToRecord,
} from "@lefrigo/shared";
import type { RecipeStepDto } from "@lefrigo/shared";
import styles from "./RecipeFormStep3.module.css";
import { StepList } from "./components";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  defaultValues: Partial<RecipeStepsDto>;
  onSubmit: (data: RecipeStepsDto) => void;
  onBack: () => void;
  loading?: boolean;
  stepper: React.ReactNode;
};

/**
 * Étape 3 du formulaire de création de recette.
 *
 * Permet d'ajouter, réordonner (↑↓) et supprimer des étapes de préparation.
 * Les positions sont recalculées automatiquement à chaque modification.
 * Valide via `recipeStepsSchema` avant d'appeler `onSubmit`.
 */
export function RecipeFormStep3({
  defaultValues,
  onSubmit,
  onBack,
  loading,
  stepper,
}: Props) {
  const [steps, setSteps] = useState<RecipeStepDto[]>(
    defaultValues.steps ?? [],
  );
  const [draft, setDraft] = useState("");
  const { setErrors, clearFieldError, errorMessages } = useFormErrors();

  /* ── Recalcul des positions ── */

  /** Réassigne les positions 1..n après chaque modification de la liste. */
  const reorder = (list: RecipeStepDto[]): RecipeStepDto[] =>
    list.map((step, i) => ({ ...step, position: i + 1 }));

  /* ── Ajout ── */

  const addStep = useCallback(() => {
    if (!draft.trim()) return;

    setSteps((prev) =>
      reorder([
        ...prev,
        { position: prev.length + 1, instruction: draft.trim() },
      ]),
    );
    setDraft("");
    clearFieldError("steps");
  }, [draft, clearFieldError]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addStep();
    }
  };

  /* ── Suppression ── */

  const removeStep = useCallback((index: number) => {
    setSteps((prev) => reorder(prev.filter((_, i) => i !== index)));
  }, []);

  /* ── Réordonnancement ── */

  const moveUp = useCallback((index: number) => {
    if (index === 0) return;
    setSteps((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return reorder(next);
    });
  }, []);

  const moveDown = useCallback((index: number) => {
    setSteps((prev) => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return reorder(next);
    });
  }, []);

  /* ── Submit ── */

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const result = recipeStepsSchema.safeParse({ steps });

    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      return;
    }

    onSubmit(result.data);
  };

  return (
    <FormCard
      icon={<span>📋</span>}
      title="Étapes de préparation"
      description="Décrivez chaque étape dans l'ordre. Appuyez sur Entrée pour ajouter."
      buttonLabel="Créer la recette"
      backLabel="Retour"
      buttonLoadingLabel="Création en cours..."
      onSubmit={handleSubmit}
      onBack={onBack}
      errorMessages={errorMessages}
      disabled={loading || steps.length === 0}
      stepper={stepper}
    >
      {/* ── Zone de saisie ── */}
      <div className={styles.addRow}>
        <TextArea
          className={styles.textArea}
          placeholder="Décrivez une étape..."
          iconLeft={<TbPencilPlus />}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
        />
        <Button
          type="button"
          className={styles.addButton}
          onClick={addStep}
          disabled={!draft.trim()}
          aria-label="Ajouter l'étape"
        >
          <TbPlus />
        </Button>
      </div>

      {/* ── Liste des étapes ── */}
      <StepList
        steps={steps}
        onMoveUp={moveUp}
        onMoveDown={moveDown}
        onRemove={removeStep}
      />
    </FormCard>
  );
}
