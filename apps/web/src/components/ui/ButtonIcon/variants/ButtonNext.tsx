import { ButtonIcon } from "../ButtonIcon";
import { IoChevronForward } from "react-icons/io5";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: "sm" | "md" | "lg";
};

export function ButtonNext({ size = "md", ...props }: Props) {
  return (
    <ButtonIcon variant="accent" size={size} aria-label="Suivant" {...props}>
      <IoChevronForward />
    </ButtonIcon>
  );
}
