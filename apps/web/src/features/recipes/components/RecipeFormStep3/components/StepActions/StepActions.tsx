"use client";

import styles from "./StepActions.module.css";
import { RowActionDelete, RowActionMoveDown, RowActionMoveUp } from "@/components/ui";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  position: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

/**
 * Paire de boutons d'action pour une étape de préparation.
 *
 * États :
 * - Flèche haut désactivée sur le premier item
 * - Flèche bas désactivée sur le dernier item
 */
export function StepActions({ position, isFirst, isLast, onMoveUp, onMoveDown, onRemove }: Props) {
  return (
    <div className={styles.actions}>
      {/* ── Monter ── */}
      <RowActionMoveUp onClick={onMoveUp} disabled={isFirst}/>
      <RowActionMoveDown onClick={onMoveDown} disabled={isLast}/>
      <RowActionDelete onClick={onRemove} ariaLabel={`Supprimer l'étape ${position}`}/>
    </div>
  );
}