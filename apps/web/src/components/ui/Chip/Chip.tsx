import { IoMdCloseCircle } from "react-icons/io";
import { Color, Size, Variant } from "../types";
import styles from "./Chip.module.css";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: Variant;
  color?: Color;
  size?: Size;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
};

/**
 * Chip — étiquette compacte, sélectionnable, cliquable et/ou supprimable.
 *
 * États visuels clés :
 * - `variant` × `color` pilotent l'apparence via les data-attributes
 *   (`data-appearance`, `data-color`) consommés par les tokens CSS.
 * - `size` pilote le gabarit (padding, font-size) via `data-size`.
 * - `selected` bascule un style actif via `data-selected`.
 * - `disabled` désactive les interactions.
 *
 * Comportements dynamiques :
 * - `onClick` et `onRemove` sont indépendants : un chip peut être
 *   cliquable ET supprimable en même temps.
 * - Le clic sur l'icône de suppression stoppe la propagation pour ne
 *   pas déclencher `onClick` par la même occasion.
 */
export function Chip({
  children,
  icon,
  variant = "soft",
  color = "primary",
  size = "sm",
  selected,
  disabled,
  onClick,
  removable,
  onRemove,
  className,
}: Props) {
  /** Ferme/supprime le chip sans déclencher le onClick du parent. */
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove?.();
  };

  return (
    <span
      data-sizeable
      data-size={size}
      data-color={color}
      data-variant={variant}
      data-selected={selected || undefined}
      className={clsx(styles.wrapper, className)}
    >
      {/* ── Chip principal (cliquable) ── */}
      <button
        type="button"
        className={styles.chip}
        onClick={onClick}
        disabled={disabled}
      >
        {/* ── Icône de préfixe (optionnelle) ── */}
        {icon && <span className={styles.icon}>{icon}</span>}

        {children}
      </button>

      {/* ── Bouton de suppression (indépendant du clic principal) ── */}
      {removable && (
        <button
          type="button"
          className={clsx(styles.icon, styles.removeIcon)}
          onClick={handleRemove}
          disabled={disabled}
          aria-label="Supprimer"
        >
          <IoMdCloseCircle />
        </button>
      )}
    </span>
  );
}