import clsx from "clsx";
import styles from "./RowAction.module.css";
import { ReactNode } from "react";

/* ── Types ─────────────────────────────────────────────────── */

type Color = "primary" | "accent" | "danger" | "info" | "warning" | "neutral";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  icon: ReactNode;
  color: Color;
  /** Décrit l'action pour les lecteurs d'écran */
  ariaLabel: string;
};

/**
 * Bouton d'action iconique pour une ligne de liste.
 *
 * Utilisé dans `IngredientActions`, `StepActions`, et tout contexte
 * nécessitant des actions inline sur un item (édition, suppression, réordonnancement…).
 *
 * La couleur définit l'intent visuel au hover via une variante CSS.
 */
export function RowAction({ onClick, disabled = false, icon, color, ariaLabel }: Props) {
  return (
    <button
      type="button"
      className={clsx(styles.actionBtn, styles[color])}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}