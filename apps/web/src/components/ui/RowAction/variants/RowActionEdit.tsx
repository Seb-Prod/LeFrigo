import { TbPencil } from "react-icons/tb";
import { RowAction } from "../RowAction";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * Variante édition de `RowAction` — icône crayon, intent warning.
 */
export function RowActionEdit({ onClick, disabled = false, ariaLabel = "Modifier" }: Props) {
  return (
    <RowAction
      onClick={onClick}
      icon={<TbPencil />}
      color="warning"
      disabled={disabled}
      ariaLabel={ariaLabel}
    />
  );
}