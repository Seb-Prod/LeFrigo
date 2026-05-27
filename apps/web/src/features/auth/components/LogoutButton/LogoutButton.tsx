import { IoLogOut } from "react-icons/io5";
import styles from "./LogoutButton.module.css";
import { useAuth } from "@/contexts/auth.context";
import { authService } from "../../services/auth.service";
import { authStorage } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Props = {
  // onClick: () => void;
  className?: string;
};

export function LogoutButton({ className }: Props) {
  const router = useRouter();
  const { logout } = useAuth();
  const handleClose = async () => {
    try {
      const refreshToken = authStorage.getRefreshToken();
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (err) {
      console.log(err);
    } finally {
      logout(); // ← vider context + storage dans TOUS les cas
      router.push("/");
    }
  };

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <button onClick={handleClose} className={styles.btn}>
        <div className={styles.logoutIcon}>
          <IoLogOut className={styles.logout} />
        </div>
        <div className={styles.text}>Déconnexion</div>
      </button>
    </div>
  );
}
