import { ReactNode } from "react";
import styles from "./Input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

/**
 * Champ de saisie de base avec support optionnel d'icônes gauche et droite.
 *
 * @example
 * // Sans icône
 * <Input
 *   placeholder="Texte"
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 * />
 *
 * @example
 * // Avec icônes
 * <Input
 *   placeholder="Texte"
 *   iconLeft={<FiUser />}
 *   iconRight={<FiX />}
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 * />
 */
export function Input({ className, iconLeft, iconRight, ...props }: Props) {
  const hasIcon = iconLeft || iconRight;

  if (!hasIcon) {
    return <input className={`${styles.input} ${className ?? ""}`} {...props} />;
  }

  return (
    <div className={styles.wrapper}>
      {iconLeft && (
        <span className={styles.iconLeft} aria-hidden="true">
          {iconLeft}
        </span>
      )}
      <input
        className={[
          styles.input,
          iconLeft && styles.hasIconLeft,
          iconRight && styles.hasIconRight,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {iconRight && (
        <span className={styles.iconRight} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </div>
  );
}