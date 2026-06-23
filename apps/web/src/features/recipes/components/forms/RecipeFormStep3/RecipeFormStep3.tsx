"use client";

import { useState, useCallback } from "react";
import { TbPlus, TbPencilPlus } from "react-icons/tb";
import { FormCard, Button, TextArea } from "@/components/ui";
import { useFormErrors } from "@/hooks/useFormErrors";
import {
  recipeStepsSchema,
  RecipeStepsDto,
  zodErrorsToRecord,
} from "@lefrigo/shared";
import type { RecipeStepDto } from "@lefrigo/shared";
import styles from "./RecipeFormStep3.module.css";
import { StepList } from "./components";
import { usePendingStep } from "./hooks/usePendingStep";

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
 * Permet d'ajouter, éditer, réordonner (↑↓) et supprimer des étapes.
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

  const reorder = (list: RecipeStepDto[]): RecipeStepDto[] =>
    list.map((step, i) => ({ ...step, position: i + 1 }));

  /* ── Commit édition ── */

  const handleCommit = useCallback(
    (instruction: string, editingIndex: number | null) => {
      if (editingIndex === null) return;
      setSteps((prev) =>
        reorder(
          prev.map((step, i) =>
            i === editingIndex ? { ...step, instruction } : step,
          ),
        ),
      );
    },
    [],
  );

  const {
    editingIndex,
    draft: editDraft,
    setDraft: setEditDraft,
    openEdit,
    confirm,
    cancel,
  } = usePendingStep({ onCommit: handleCommit });

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
      if (editingIndex !== null) {
        confirm();
      } else {
        addStep();
      }
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

  /** Valeur et placeholder du textarea selon le mode */
  const isEditing = editingIndex !== null;

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
      disabled={loading || steps.length === 0 || isEditing}
      stepper={stepper}
    >
      {/* ── Zone de saisie ── */}
      <div className={styles.addRow}>
        <TextArea
          className={styles.textArea}
          placeholder={
            isEditing ? "Modifiez l'étape..." : "Décrivez une étape..."
          }
          iconLeft={<TbPencilPlus />}
          value={isEditing ? editDraft : draft}
          onChange={(e) =>
            isEditing ? setEditDraft(e.target.value) : setDraft(e.target.value)
          }
          onKeyDown={handleKeyDown}
          rows={2}
        />

        {/* ── Boutons ajout ou confirmation/annulation ── */}
        {isEditing ? (
          <div className={styles.editActions}>
            <Button
              type="button"
              variant="ghost"
              onClick={cancel}
              aria-label="Annuler l'édition"
            >
              Annuler
            </Button>
            <Button
              type="button"
              onClick={confirm}
              disabled={!editDraft.trim()}
              aria-label="Confirmer l'édition"
            >
              OK
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            className={styles.addButton}
            onClick={addStep}
            disabled={!draft.trim()}
            aria-label="Ajouter l'étape"
          >
            <TbPlus />
          </Button>
        )}
      </div>

      {/* ── Liste des étapes ── */}
      <StepList
        steps={steps}
        editingIndex={editingIndex}
        onEdit={(index) => openEdit(steps[index], index)}
        onMoveUp={moveUp}
        onMoveDown={moveDown}
        onRemove={removeStep}
        disabled={isEditing}
      />
    </FormCard>
  );
}
