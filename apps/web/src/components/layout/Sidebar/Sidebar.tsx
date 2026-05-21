"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";

type Props = {
  mobile?: boolean;
  onClose?: () => void;
};

export function Sidebar({ mobile, onClose }: Props) {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Recettes", href: "/recipes" },
    { label: "Planning", href: "/planning" },
    { label: "Paramètres", href: "/settings" },
  ];

  return (
    <aside className={`${styles.sidebar} ${mobile ? styles.mobile : ""}`}>
      {mobile && (
        <button className={styles.closeButton} onClick={onClose}>
          x
        </button>
      )}
      <h2 className={styles.logo}>LeFrigo</h2>

      <nav>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
