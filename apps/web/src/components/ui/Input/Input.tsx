import { ReactNode } from "react";
import styles from "./Input.module.css";
import { Color, InputVariant, Size } from "../types";
import clsx from "clsx";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  color?: Color;
  variant?: InputVariant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  error?: boolean;
};

/**
 * Champ de saisie générique piloté par la matrice couleur × variant (résolue via
 * [data-color] / [data-variant] en CSS), avec taille configurable et icônes optionnelles.
 * États visuels : normal, focus (halo coloré selon la couleur active), erreur (surcharge
 * danger fixe, indépendante de `color`/`variant`), avec ou sans icône(s).
 */
export function Input({
  color = "primary",
  variant = "flushed",
  size = "md",
  className,
  iconLeft,
  iconRight,
  error,
  ...props
}: Props) {
  const hasIcon = iconLeft || iconRight;

  /* ── Classes de l'input ─────────────────────────────────── */
  /** Communes aux deux branches : icônes (si présentes), erreur, className externe */
  const inputClassName = clsx(
    styles.input,
    iconLeft && styles.hasIconLeft,
    iconRight && styles.hasIconRight,
    className,
  );

  if (!hasIcon) {
    return (
      <input
        data-color={error ? "danger" : color}
        data-variant={variant}
        data-size={size}
        className={inputClassName}
        {...props}
      />
    );
  }

  return (
    <div
      data-sizeable
      data-color={error ? "danger" : color}
      data-variant={variant}
      data-size={size}
      className={styles.wrapper}
    >
      {/* ── Icône gauche ─────────────────────────────────── */}
      {iconLeft && (
        <span className={styles.iconLeft} aria-hidden="true">
          {iconLeft}
        </span>
      )}

      <input className={inputClassName} {...props} />

      {/* ── Icône droite ─────────────────────────────────── */}
      {iconRight && (
        <span className={styles.iconRight} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </div>
  );
}
