import { TbArrowDown } from "react-icons/tb";
import { RowAction } from "../RowAction";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * Variante réordonnancement de `RowAction` — icône flèche haut, intent info. Désactivé sur le premier item.
 */
export function RowActionMoveDown({ onClick, disabled = false, ariaLabel = "Descendre" }: Props) {
  return (
    <RowAction
      onClick={onClick}
      icon={<TbArrowDown />}
      color="info"
      disabled={disabled}
      ariaLabel={ariaLabel}
    />
  );
}