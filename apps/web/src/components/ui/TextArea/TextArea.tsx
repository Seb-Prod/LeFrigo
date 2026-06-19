import { ReactNode } from "react";
import styles from "./TextArea.module.css";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  error?: boolean;
};

/**
 * Zone de saisie multiligne avec support optionnel d'icônes gauche et droite.
 * Partage la même API visuelle que `Input` — mêmes tokens CSS, mêmes classes.
 *
 * @example
 * // Sans icône
 * <TextArea
 *   placeholder="Description"
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 * />
 *
 * @example
 * // Avec icône gauche
 * <TextArea
 *   placeholder="Description"
 *   iconLeft={<FiAlignLeft />}
 *   rows={4}
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 * />
 */
export function TextArea({
  className,
  iconLeft,
  iconRight,
  error,
  ...props
}: Props) {
  const hasIcon = iconLeft || iconRight;

  if (!hasIcon) {
    return (
      <textarea
        className={[styles.textarea, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

  return (
    <div
      className={[styles.wrapper, error && styles.hasError]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Icône gauche ── */}
      {iconLeft && (
        <span className={styles.iconLeft} aria-hidden="true">
          {iconLeft}
        </span>
      )}

      <textarea
        className={[
          styles.textarea,
          iconLeft && styles.hasIconLeft,
          iconRight && styles.hasIconRight,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {/* ── Icône droite ── */}
      {iconRight && (
        <span className={styles.iconRight} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </div>
  );
}