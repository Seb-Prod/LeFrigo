"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";
import { LogoutButton } from "@/features/auth";
import { authStorage } from "@/lib/auth";
import { authService } from "@/features/auth/services/auth.service";
import { useRouter } from "next/navigation";

type Props = {
  mobile?: boolean;
  onClose?: () => void;
};

export function Sidebar({ mobile, onClose }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Recettes", href: "/recipes" },
    { label: "Planning", href: "/planning" },
    { label: "Paramètres", href: "/settings" },
  ];

  const handleClose = async () => {
    try {
      const refreshToken = authStorage.getRefreshToken();
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (err) {
      console.log(err);
    } finally {
      logout();
      router.push("/");
    }
  };

  return (
    <aside className={`${styles.sidebar} ${mobile ? styles.mobile : ""}`}>
      {mobile && (
        <button className={styles.closeButton} onClick={onClose}>
          x
        </button>
      )}
      <h2 className={styles.logo}>LeFrigo</h2>

      <nav>
        <ul className={styles.menu}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <LogoutButton className={styles.logoutButton} onClick={handleClose} />
    </aside>
  );
}
