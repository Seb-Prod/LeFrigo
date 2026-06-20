import { TbArrowUp } from "react-icons/tb";
import { RowAction } from "../RowAction";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * Variante réordonnancement de `RowAction` — icône flèche bas, intent info. Désactivé sur le dernier item.
 */
export function RowActionMoveUp({ onClick, disabled = false, ariaLabel = "Monter" }: Props) {
  return (
    <RowAction
      onClick={onClick}
      icon={<TbArrowUp />}
      color="info"
      disabled={disabled}
      ariaLabel={ariaLabel}
    />
  );
}