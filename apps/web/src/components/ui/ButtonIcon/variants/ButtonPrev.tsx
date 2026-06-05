import { ButtonIcon } from "../ButtonIcon";
import { IoChevronBack } from "react-icons/io5";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: "sm" | "md" | "lg";
};

export function ButtonPrev({ size = "md", ...props }: Props) {
  return (
    <ButtonIcon variant="accent" size={size} aria-label="Précédent" {...props}>
      <IoChevronBack />
    </ButtonIcon>
  );
}
