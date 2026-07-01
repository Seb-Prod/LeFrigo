import { FaInfo } from "react-icons/fa";
import { ButtonIcon, Size, Variant } from "../ButtonIcon";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: Size;
  variant?: Variant;
};

export function ButtonInfo({ size = "md", variant = "info", ...props }: Props) {
  return (
    <ButtonIcon
      variant={variant}
      size={size}
      aria-label="Information"
      {...props}
    >
      <FaInfo />
    </ButtonIcon>
  );
}
