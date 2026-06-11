import clsx from "clsx";
import styles from "./Button.module.css";

/* ── Types ── */

type Variant = "primary" | "accent" | "danger" | "info" | "warning" | "neutral";
type Appearance = "solid" | "soft" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Couleur sémantique du bouton. @default "primary" */
  variant?: Variant;
  /** Apparence visuelle. @default "solid" */
  appearance?: Appearance;
  /** Désactive l'animation blob. @default false */
  animate?: boolean;
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
  variant = "primary",
  appearance = "solid",
  animate = true,
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[appearance],
        !animate && styles.noBlob,
        className,
      )}
      {...props}
    />
  );
}
