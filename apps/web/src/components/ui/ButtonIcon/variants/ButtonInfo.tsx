import { FaInfo } from "react-icons/fa";
import { ButtonIcon } from "../ButtonIcon";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: "sm" | "md" | "lg";
};

export function ButtonInfo({ size = "md", ...props }: Props) {
  return (
    <ButtonIcon variant="info" size={size} aria-label="Information" {...props}>
      <FaInfo />
    </ButtonIcon>
  );
}