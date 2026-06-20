import clsx from "clsx";
import styles from "./Button.module.css";

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
};

/**
 * Bouton polyvalent avec animation blob liquide.
 *
 * Axes de personnalisation :
 * - `variant`      : couleur sémantique (primary / accent / danger)
 * - `appearance` : solid (fond plein) | soft (pastel) | ghost (contour)
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
  className,
  ...props
}: Props) {
  return (
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
    />
  );
}
