"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import styles from "./DashboardLayout.module.css";
import { useDevice } from "@/contexts/device.context";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile } = useDevice();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      {(!isMobile || menuOpen) && (
        <Sidebar mobile={isMobile} onClose={() => setMenuOpen(false)} />
      )}

      <div className={styles.content}>
        <Topbar onMenuClick={() => setMenuOpen(true)} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
