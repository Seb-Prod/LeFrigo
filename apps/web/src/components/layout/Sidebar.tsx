"use client";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
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