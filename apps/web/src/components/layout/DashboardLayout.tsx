"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import styles from "./DashboardLayout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.content}>
        <Topbar />

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}