"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";

type Props = {
  mobile?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ mobile, onClose }: Props) {
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
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/recipes">Recettes</Link>
          </li>

          <li>
            <Link href="/planning">Planning</Link>
          </li>

          <li>
            <Link href="/settings">Paramètres</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
