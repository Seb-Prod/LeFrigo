import { useState, useCallback } from "react";
import { RecipeIngredientDto } from "@lefrigo/shared";

/** État du mini-formulaire — création ou édition */
type PendingIngredient = {
  name: string;
  quantity: number | undefined;
  unit: string;
};

type Options = {
  /** Appelé quand un ingrédient est ajouté ou mis à jour */
  onCommit: (ingredient: RecipeIngredientDto, editingIndex: number | null) => void;
  /** Appelé pour effacer l'erreur Zod sur le champ `ingredients` */
  onClearError: () => void;
};

/**
 * Gère le cycle de vie du mini-formulaire d'ingrédient.
 *
 * États :
 * - `pending: null`                → formulaire fermé
 * - `pending + editingIndex: null` → mode création
 * - `pending + editingIndex: N`    → mode édition de l'item N
 */
export function usePendingIngredient({ onCommit, onClearError }: Options) {
  const [pending, setPending] = useState<PendingIngredient | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  /** Ouvre le formulaire en mode création avec le nom sélectionné */
  const openCreate = useCallback((name: string) => {
    setEditingIndex(null);
    setPending({ name, quantity: 0, unit: "" });
  }, []);

  /** Ouvre le formulaire en mode édition pour l'item à l'index donné */
  const openEdit = useCallback((ingredient: RecipeIngredientDto, index: number) => {
    setEditingIndex(index);
    setPending({
      name: ingredient.name,
      quantity: ingredient.quantity ?? undefined,
      unit: ingredient.unit ?? "",
    });
  }, []);

  /** Applique un patch partiel à l'état courant */
  const patch = useCallback((partial: Partial<PendingIngredient>) => {
    setPending((prev) => (prev ? { ...prev, ...partial } : null));
  }, []);

  /** Valide et envoie l'ingrédient au parent, puis ferme le formulaire */
  const confirm = useCallback(() => {
    if (!pending) return;

    onCommit(
      {
        name: pending.name,
        quantity: pending.quantity ? Number(pending.quantity) : undefined,
        unit: pending.unit.trim() || undefined,
      },
      editingIndex,
    );

    setPending(null);
    setEditingIndex(null);
    onClearError();
  }, [pending, editingIndex, onCommit, onClearError]);

  /** Ferme le formulaire sans valider */
  const cancel = useCallback(() => {
    setPending(null);
    setEditingIndex(null);
  }, []);

  return { pending, editingIndex, openCreate, openEdit, patch, confirm, cancel };
}