import clsx from "clsx";
import styles from "./MenuItemIcon.module.css";

/* ── Types ── */

type Color = "primary" | "accent" | "success" | "warning" | "danger" | "info" | "neutral";
type Size  = "sm" | "md";

type Props = {
  /** Couleur sémantique du fond. */
  color?: Color;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

/**
 * Conteneur d'icône arrondi style iOS pour les items de menu.
 *
 * Visuels clés :
 * - Fond pastel teinté selon `color`
 * - Icône colorée dans la même teinte
 * - Deux tailles : sm (listes denses) et md (défaut)
 *
 * Usage :
 * ```tsx
 * <MenuItem
 *   icon={<MenuItemIcon color="primary"><FiUsers /></MenuItemIcon>}
 *   label="Membres"
 * />
 * ```
 */
export function MenuItemIcon({ color = "neutral", size = "md", className, children }: Props) {
  return (
    <div
      className={clsx(
        styles.icon,
        styles[color],
        styles[size],
        className,
      )}
    >
      {children}
    </div>
  );
}