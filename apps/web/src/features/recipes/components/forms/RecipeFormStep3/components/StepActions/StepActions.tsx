"use client";

import styles from "./StepActions.module.css";
import { RowActionDelete, RowActionEdit, RowActionMoveDown, RowActionMoveUp } from "@/components/ui";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  position: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onEdit: () => void;
  disabled: boolean;
};

/**
 * Paire de boutons d'action pour une étape de préparation.
 *
 * États :
 * - Flèche haut désactivée sur le premier item
 * - Flèche bas désactivée sur le dernier item
 */
export function StepActions({ position, isFirst, isLast, onMoveUp, onMoveDown, onRemove, onEdit, disabled }: Props) {
  return (
    <div className={styles.actions}>
      {/* ── Monter ── */}
      <RowActionMoveUp onClick={onMoveUp} disabled={isFirst || disabled}/>
      <RowActionMoveDown onClick={onMoveDown} disabled={isLast || disabled}/>
      <RowActionEdit onClick={onEdit} ariaLabel={`Editer l'étape ${position}`} disabled={disabled}/>
      <RowActionDelete onClick={onRemove} ariaLabel={`Supprimer l'étape ${position}`} disabled={disabled}/>
    </div>
  );
}