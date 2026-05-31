import { ButtonIcon } from "../ButtonIcon";
import { IoClose } from "react-icons/io5";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: "sm" | "md" | "lg";
};

export function ButtonClose({ size = "md", ...props }: Props) {
  return (
    <ButtonIcon
      variant="danger"
      size={size}
      aria-label="Information"
      {...props}
    >
      <IoClose />
    </ButtonIcon>
  );
}
