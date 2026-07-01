import { IoIosRemove } from "react-icons/io";
import { ButtonIcon, Size, Variant } from "../ButtonIcon";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: Size;
  variant?: Variant;
};

export function ButtonRemove({
  size = "md",
  variant = "danger",
  ...props
}: Props) {
  return (
    <ButtonIcon variant={variant} size={size} aria-label="Ajouter" {...props}>
      <IoIosRemove />
    </ButtonIcon>
  );
}
