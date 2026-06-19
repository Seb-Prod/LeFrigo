import { IoIosRemove } from "react-icons/io";
import { ButtonIcon } from "../ButtonIcon";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: "sm" | "md" | "lg";
};

export function ButtonRemove({ size = "md", ...props }: Props) {
  return (
    <ButtonIcon variant="danger" size={size} aria-label="Ajouter" {...props}>
      <IoIosRemove />
    </ButtonIcon>
  );
}
