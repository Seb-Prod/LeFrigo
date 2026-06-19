import { IoIosAdd } from "react-icons/io";
import { ButtonIcon } from "../ButtonIcon";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: "sm" | "md" | "lg";
};

export function ButtonAdd({ size = "md", ...props }: Props) {
  return (
    <ButtonIcon variant="success" size={size} aria-label="Ajouter" {...props}>
      <IoIosAdd />
    </ButtonIcon>
  );
}
