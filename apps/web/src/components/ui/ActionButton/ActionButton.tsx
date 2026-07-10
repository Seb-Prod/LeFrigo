import { ButtonVariant, Color, Size } from "../types";
import clsx from "clsx";
import styles from "./ActionButton.module.css";
import { ReactNode } from "react";
import { FaQuestion } from "react-icons/fa";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  size?: Size;
  variant?: ButtonVariant;
  children?: ReactNode;
  className?: string;
};

/**
 * ActionButton
 *
 * Bouton d'action générique piloté par attributs `data-*` (color, variant, size)
 * consommés par `ActionButton.module.css` pour le styling.
 *
 * États visuels clés :
 * - `color`   : teinte sémantique du bouton (défaut : "primary")
 * - `variant` : apparence (défaut : "ghost")
 * - `size`    : taille (défaut : "xs")
 *
 * Comportements dynamiques :
 * - Type forcé à "button" pour éviter tout submit implicite dans un formulaire
 * - Toutes les props natives d'un <button> sont transmises via `...props`
 * - Affiche `children` si fourni, sinon retombe sur l'icône `FaQuestion` par défaut
 */
export function ActionButton({
  color = "primary",
  size = "xs",
  variant = "ghost",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      data-sizeable
      data-color={color}
      data-variant={variant}
      data-size={size}
      type="button"
      className={clsx("ui-control", styles.actionButton, className)}
      {...props}
    >
      {/* ── Contenu ── */}
      {/* Icône par défaut si aucun children n'est passé */}
      {children ? children : <FaQuestion />}
    </button>
  );
}