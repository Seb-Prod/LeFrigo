import { ButtonIcon, Size, Variant } from "../ButtonIcon";
import { IoClose } from "react-icons/io5";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: Size;
  variant?: Variant;
};

export function ButtonClose({
  size = "md",
  variant = "danger",
  ...props
}: Props) {
  return (
    <ButtonIcon
      variant={variant}
      size={size}
      aria-label="Information"
      {...props}
    >
      <IoClose />
    </ButtonIcon>
  );
}
