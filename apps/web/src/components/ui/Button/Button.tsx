import clsx from "clsx";
import styles from "./Button.module.css";
import { Badge } from "../Badge";

/* ── Types ── */

type Colors = "primary" | "accent" | "danger" | "info" | "warning" | "neutral";
type Variants = "solid" | "soft" | "ghost";
type Sizes = "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Couleur sémantique du bouton. @default "primary" */
  color?: Colors;
  /** Apparence visuelle. @default "solid" */
  variant?: Variants;
  /** Désactive l'animation blob. @default false */
  animate?: boolean;
  size?: Sizes;
  /** Icône affichée avant le contenu du bouton. */
  icon?: React.ReactNode;
  /** Affiche une pastille en haut à droite du bouton. */
  count?: number;
};

/**
 * Bouton polyvalent avec animation blob liquide.
 *
 * Axes de personnalisation :
 * - `variant`      : couleur sémantique (primary / accent / danger)
 * - `appearance` : solid (fond plein) | soft (pastel) | ghost (contour)
 *
 * Contenu :
 * - `icon` : rendue avant `children`, dans un wrapper dédié pour l'espacement/alignement
 *
 * Animation :
 * - Hover  → deux blobs montent depuis le bas (CSS pur, ::before + ::after)
 * - Active → scale press (0.08s)
 */
export function Button({
  color = "primary",
  variant = "solid",
  animate = true,
  size = "md",
  icon,
  count,
  className,
  children,
  ...props
}: Props) {
  return (
    <span className={styles.wrapper}>
      <button
        className={clsx(
          styles.button,
          styles[variant],
          styles[color],
          styles[size],
          !animate && styles.noBlob,
          className,
        )}
        {...props}
        onMouseUp={(e) => {
          e.currentTarget.blur();
          props.onMouseUp?.(e);
        }}
      >
        {/* ── Icône ── */}
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </button>
      {/* –– Badge –– */}
      {count != null && count > 0 && (
        <Badge size="xs" color="danger" className={styles.badge}>
          {count}{" "}
        </Badge>
      )}
    </span>
  );
}
