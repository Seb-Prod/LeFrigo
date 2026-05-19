"use client";

import styles from "./Sidebar.module.css";

type Props = {
  mobile?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ mobile, onClose }: Props) {
  return (
    <aside className={`${styles.sidebar} ${mobile ? styles.mobile : ""}`}>
      {mobile && <button className={styles.closeButton} onClick={onClose}>x</button>}
      <h2 className={styles.logo}>LeFrigo</h2>

      <nav>
        <ul className={styles.menu}>
          <li>Dashboard</li>
          <li>Produits</li>
          <li>Courses</li>
          <li>Paramètres</li>
        </ul>
      </nav>
    </aside>
  );
}
