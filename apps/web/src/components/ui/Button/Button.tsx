import clsx from "clsx";
import styles from "./Button.module.css";
import { Badge } from "../Badge";
import { Color, Size, Variant } from "../types";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  count?: number;
};

/** Nombre au-delà duquel le badge affiche "+99" plutôt que la valeur exacte. */
const MAX_DISPLAYED_COUNT = 99;

/**
 * Button — bouton principal avec icône, badge de compteur et variantes de style.
 *
 * États visuels clés :
 * - `variant` × `color` pilotent l'apparence via les data-attributes
 *   (`data-appearance`, `data-color`) consommés par les tokens CSS.
 * - `size` pilote le gabarit (padding, font-size, icône) via `data-size`.
 *
 * Comportements dynamiques :
 * - Le badge n'est rendu que si `count` est défini et strictement positif.
 * - Un `blur()` est forcé sur `mouseup` pour retirer le focus visuel après
 *   un clic à la souris (accessibilité clavier préservée via `onMouseUp`
 *   qui n'intercepte pas les autres méthodes de focus).
 */
export function Button({
  color = "primary",
  variant = "solid",
  size = "md",
  icon,
  count,
  className,
  children,
  ...props
}: Props) {
  /** Retire le focus visuel après un clic souris, sans bloquer le onMouseUp du parent. */
  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    props.onMouseUp?.(e);
  };

  /** Texte affiché dans le badge, plafonné à MAX_DISPLAYED_COUNT. */
  const displayedCount =
    count != null && count > MAX_DISPLAYED_COUNT
      ? `+${MAX_DISPLAYED_COUNT}`
      : count;

  return (
    <span
      data-sizeable
      data-size={size}
      data-color={color}
      data-variant={variant}
      className={clsx(styles.wrapper, className)}
    >
      <button className={clsx(styles.button, "ui-control")} {...props} onMouseUp={handleMouseUp}>
        {/* ── Icône ── */}
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </button>

      {/* ── Badge de compteur (affiché si count > 0) ── */}
      {count != null && count > 0 && (
        <Badge size="xs" color="danger" className={styles.badge}>
          {displayedCount}{" "}
        </Badge>
      )}
    </span>
  );
}
