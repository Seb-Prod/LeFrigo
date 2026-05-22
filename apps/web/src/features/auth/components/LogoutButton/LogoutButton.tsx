import { IoLogOut } from "react-icons/io5";
import styles from "./LogoutButton.module.css";

type Props = {
  onClick: () => void;
  className?: string;
};

export function LogoutButton({ onClick, className }: Props) {
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <button onClick={onClick} className={styles.btn}>
        <div className={styles.logoutIcon}>
          <IoLogOut className={styles.logout} />
        </div>
        <div className={styles.text}>Déconnexion</div>
      </button>
    </div>
  );
}
