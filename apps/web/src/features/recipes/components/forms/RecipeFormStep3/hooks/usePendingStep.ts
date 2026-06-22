import { useState, useCallback } from "react";
import type { RecipeStepDto } from "@lefrigo/shared";

type Options = {
  onCommit: (instruction: string, editingIndex: number | null) => void;
};

/**
 * Gère le cycle de vie de l'édition d'une étape de préparation.
 *
 * États :
 * - `editingIndex: null` → aucune édition en cours
 * - `editingIndex: N`    → édition de l'étape à l'index N
 */
export function usePendingStep({ onCommit }: Options) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");

  /** Ouvre l'édition pour l'étape à l'index donné */
  const openEdit = useCallback((step: RecipeStepDto, index: number) => {
    setEditingIndex(index);
    setDraft(step.instruction);
  }, []);

  /** Valide et envoie la mise à jour, puis ferme l'édition */
  const confirm = useCallback(() => {
    if (!draft.trim() || editingIndex === null) return;
    onCommit(draft.trim(), editingIndex);
    setEditingIndex(null);
    setDraft("");
  }, [draft, editingIndex, onCommit]);

  /** Annule sans modifier */
  const cancel = useCallback(() => {
    setEditingIndex(null);
    setDraft("");
  }, []);

  return { editingIndex, draft, setDraft, openEdit, confirm, cancel };
}