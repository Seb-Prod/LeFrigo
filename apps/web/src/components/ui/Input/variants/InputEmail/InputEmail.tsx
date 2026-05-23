import { useState } from "react";
import { Input } from "../../Input";
import { FiMail } from "react-icons/fi";
import styles from "./InputEmail.module.css";

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
  const [show, setShow] = useState(false);

  return (
    <div className={styles.wrapper}>
      <FiMail
        className={styles.iconLeft}
        aria-hidden="true"
      />

      <Input
        {...props}
        type="email"
        className={[styles.input, className]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
