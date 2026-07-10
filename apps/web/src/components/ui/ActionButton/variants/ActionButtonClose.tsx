import { IoIosClose } from "react-icons/io";
import { ButtonVariant, Size } from "../../types";
import { ActionButton } from "../ActionButton";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "color"> & {
  size?: Size;
  variant?: ButtonVariant;
};

/**
 * ActionButtonClose
 *
 * Variante spécialisée d'`ActionButton` avec une icône fixe.
 *
 * États visuels clés :
 * - `size`    : taille du bouton (défaut : "md")
 * - `variant` : apparence (défaut : "solid")
 *
 * Comportements dynamiques :
 * - `color` n'est pas exposé : le composant utilise la couleur par défaut d'`ActionButton`
 * - Toutes les props natives d'un <button> (hors `children`/`color`) sont transmises via `...props`
 */
export function ActionButtonClose({
  size = "md",
  variant = "ghost",
  ...props
}: Props) {
  return (
    <ActionButton variant={variant} size={size} color={"danger"} aria-label="Ajouter" {...props}>
      <IoIosClose />
    </ActionButton>
  );
}