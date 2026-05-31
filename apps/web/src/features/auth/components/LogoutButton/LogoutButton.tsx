import { IoLogOut } from "react-icons/io5";
import clsx from "clsx";
import styles from "./LogoutButton.module.css";

type Size = "sm" | "md" | "lg";

type Props = {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  size?: Size;
  open?: boolean;
};

/**
 * Bouton de déconnexion animé.
 * Au survol (ou si `open` est vrai), le bouton s'élargit et affiche le texte.
 * La prop `open` force l'état étendu sans interaction.
 */
export function LogoutButton({ className, onClick, size = "md", open = false, children }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.btn, styles[size], open && styles.open, className)}
    >
      {/* ── Icône ── */}
      <div className={styles.logoutIcon}>
        <IoLogOut className={styles.logout} />
      </div>

      {/* ── Label ── */}
      <div className={styles.text}>
        {children ?? "Déconnexion"}
      </div>
    </button>
  );
}