import { Color } from "../types";

type Props = {
  /** Contenu du chip. */
  children: React.ReactNode;

  /** Icône affichée avant le texte. */
  icon?: React.ReactNode;

  /** Variante visuelle. */
  variant?: "solid" | "soft" | "outline";

  /** Couleur sémantique. */
  color?: Color;

  /** Taille. */
  size?: "sm" | "md" | "lg";

  /** État sélectionné. */
  selected?: boolean;

  /** Désactive le chip. */
  disabled?: boolean;

  /** Rend le chip cliquable. */
  onClick?: () => void;

  /** Affiche une croix de suppression. */
  removable?: boolean;

  /** Callback de suppression. */
  onRemove?: () => void;

  className?: string;
};

export function Chip(){
    return(
        <button>

        </button>
    )
}