import { IoIosAdd } from "react-icons/io";
import { ButtonIcon, Size, Variant } from "../ButtonIcon";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: Size;
  variant?: Variant;
};

export function ButtonAdd({
  size = "md",
  variant = "success",
  ...props
}: Props) {
  return (
    <ButtonIcon variant={variant} size={size} aria-label="Ajouter" {...props}>
      <IoIosAdd />
    </ButtonIcon>
  );
}
