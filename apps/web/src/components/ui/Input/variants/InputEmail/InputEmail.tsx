import { Input } from "../../Input";
import { FiMail } from "react-icons/fi";

type Props = Omit<React.ComponentProps<typeof Input>, "type">;

/**
 * Champ de saisie pour les email avec icône d'email
 *
 * @example
 * <InputEmail
 *   placeholder="Adresse mail"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 */
export function InputEmail({
  className,
  color = "primary",
  variant = "flushed",
  ...props
}: Props) {
  return (
    <Input
      color={color}
      variant={variant}
      {...props}
      type="email"
      iconLeft={<FiMail />}
      className={className}
    />
  );
}
