import { Input } from "../../Input";
import { FiMail } from "react-icons/fi";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

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
export function InputEmail({ className, ...props }: Props) {
  return (
    <Input
      {...props}
      type="email"
      iconLeft={<FiMail />}
      className={className}
    />
  );
}
