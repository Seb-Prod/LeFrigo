import { ButtonIcon, Size, Variant } from "../ButtonIcon";
import { IoChevronBack } from "react-icons/io5";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: Size;
  variant?: Variant;
};

export function ButtonPrev({
  size = "md",
  variant = "accent",
  ...props
}: Props) {
  return (
    <ButtonIcon variant={variant} size={size} aria-label="Précédent" {...props}>
      <IoChevronBack />
    </ButtonIcon>
  );
}
