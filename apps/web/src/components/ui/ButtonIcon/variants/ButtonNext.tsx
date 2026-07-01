import { ButtonIcon, Size, Variant } from "../ButtonIcon";
import { IoChevronForward } from "react-icons/io5";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: Size;
  variant?: Variant;
};

export function ButtonNext({
  size = "md",
  variant = "accent",
  ...props
}: Props) {
  return (
    <ButtonIcon variant={variant} size={size} aria-label="Suivant" {...props}>
      <IoChevronForward />
    </ButtonIcon>
  );
}
