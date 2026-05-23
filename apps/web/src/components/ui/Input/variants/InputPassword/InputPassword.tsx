import { useState } from "react";
import { Input } from "../../Input";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./InputPassword.module.css";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

/**
 * Champ de saisie pour les mots de passe avec icône de verrouillage
 * et bouton pour afficher/masquer la valeur.
 *
 * @example
 * <InputPassword
 *   placeholder="Mot de passe"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 */
export function InputPassword({ className, ...props }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.wrapper}>
      <FiLock
        className={styles.iconLeft}
        aria-hidden="true"
      />

      <Input
        {...props}
        type={show ? "text" : "password"}
        className={[styles.input, className]
          .filter(Boolean)
          .join(" ")}
      />

      <button
        type="button"
        aria-label={
          show
            ? "Masquer le mot de passe"
            : "Afficher le mot de passe"
        }
        aria-pressed={show}
        onClick={() => setShow((prev) => !prev)}
        className={styles.iconRight}
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
}
