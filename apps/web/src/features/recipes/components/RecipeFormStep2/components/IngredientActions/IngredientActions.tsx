"use client";

import { TbTrash, TbPencil } from "react-icons/tb";
import styles from "./IngredientActions.module.css";
import clsx from "clsx";
import { RowAction, RowActionDelete, RowActionEdit } from "@/components/ui";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  /** Nom de l'ingrédient — utilisé pour les aria-label */
  name: string;
  onEdit: () => void;
  onRemove: () => void;
  disabled: boolean;
};

/**
 * Paire de boutons d'action pour un ingrédient de la liste.
 *
 * États visuels :
 * - Idle : icônes crayon + poubelle
 * - Pas d'état désactivé géré ici — c'est le parent qui masque
 *   les actions quand un mini-formulaire est ouvert (via `editingIndex`)
 */
export function IngredientActions({ name, onEdit, onRemove, disabled }: Props) {
  return (
    <div className={styles.actions}>
      <RowActionEdit
        onClick={onEdit}
        disabled={disabled}
        ariaLabel={`Modifier ${name}`}
      />
      <RowActionDelete
        onClick={onRemove}
        disabled={disabled}
        ariaLabel={`Supprimer ${name}`}
      />
    </div>
  );
}
