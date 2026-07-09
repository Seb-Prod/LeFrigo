import clsx from "clsx";
import styles from "./Badge.module.css";
import { Color, Size } from "../types";

type Props = {
  children: React.ReactNode;
  size?: Size;
  color?: Color;
  className?: string;
};

/**
 * Badge — étiquette compacte pour afficher un compteur ou un statut.
 *
 * États visuels clés :
 * - `color` pilote l'apparence via le data-attribute `data-color`,
 *   toujours en variante `solid` (pas de prop `variant` ici).
 * - `size` pilote le gabarit (padding, font-size, radius) via
 *   `data-sizeable` + `data-size`, consommés par les tokens partagés
 *   avec `Button`/`Chip`.
 */
export function Badge({
  children,
  color = "danger",
  className,
  size = "md",
}: Props) {
  return (
    <span
      data-sizeable
      data-size={size}
      data-color={color}
      data-variant="solid"
      className={clsx(styles.badge, className)}
    >
      {children}
    </span>
  );
}