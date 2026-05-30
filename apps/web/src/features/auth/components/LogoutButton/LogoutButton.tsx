import { IoLogOut } from "react-icons/io5";
import styles from "./LogoutButton.module.css";
import clsx from "clsx";

type Props = {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export function LogoutButton({
  className,
  onClick,
  size = "md",
  children,
}: Props) {
  return (
    <div className={clsx(styles.container, className)}>
      <button onClick={onClick} className={clsx(styles.btn, styles[size])}>
        <div className={styles.logoutIcon}>
          <IoLogOut className={styles.logout} />
        </div>
        <div className={styles.text}>{children ? children : "Déconnexion"}</div>
      </button>
    </div>
  );
}
