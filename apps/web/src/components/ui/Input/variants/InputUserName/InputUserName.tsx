import { Input } from "../../Input";
import { FiUser } from "react-icons/fi";

type Props = Omit<React.ComponentProps<typeof Input>, "type">;

/**
 * Champ de saisie pour les pseudo avec icône user
 *
 * @example
 * <InputUserName
 *   placeholder="Pseudo"
 *   value={userName}
 *   onChange={(e) => setUserName(e.target.value)}
 * />
 */
export function InputUserName({
  color = "primary",
  variant = "flushed",
  className,
  ...props
}: Props) {
  return (
    <Input
      color={color}
      variant={variant}
      {...props}
      type="text"
      iconLeft={<FiUser />}
      className={className}
    />
  );
}
