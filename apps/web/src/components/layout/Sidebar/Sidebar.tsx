"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";
import { LogoutButton } from "@/features/auth";
import { authStorage } from "@/lib/auth";
import { authService } from "@/features/auth/services/auth.service";
import { useRouter } from "next/navigation";
import { isActivePath, NAVIGATION } from "@/lib/navigation/navigation";
import clsx from "clsx";

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
    <aside className={`${styles.sidebar}`}>
      <h2 className={styles.logo}>LeFrigo</h2>

      <nav>
        <ul className={styles.menu}>
          {NAVIGATION.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                styles.link,
                isActivePath(pathname, link.href) && styles.active,
              )}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </nav>
      <LogoutButton className={styles.logoutButton} onClick={handleClose} />
    </aside>
  );
}
