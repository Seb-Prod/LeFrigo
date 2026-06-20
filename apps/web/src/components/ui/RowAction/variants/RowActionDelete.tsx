import { TbTrash } from "react-icons/tb";
import { RowAction } from "../RowAction";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * Variante suppression de `RowAction` — icône poubelle, intent danger.
 */
export function RowActionDelete({ onClick, disabled = false, ariaLabel = "Supprimer" }: Props) {
  return (
    <RowAction
      onClick={onClick}
      icon={<TbTrash />}
      color="danger"
      disabled={disabled}
      ariaLabel={ariaLabel}
    />
  );
}