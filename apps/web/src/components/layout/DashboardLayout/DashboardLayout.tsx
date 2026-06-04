"use client";

import { MobileNav, Sidebar, Topbar } from "@/components/layout";
import styles from "./DashboardLayout.module.css";
import { useDevice } from "@/contexts/device.context";
import { useState } from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isMobile, isPWA } = useDevice();
  const isMobilePWA = isMobile && isPWA;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      {!isMobilePWA && (!isMobile || menuOpen) && (
        <Sidebar mobile={isMobile} onClose={() => setMenuOpen(false)} />
      )}

      <div className={styles.content}>
        {!isMobilePWA && <Topbar onMenuClick={() => setMenuOpen(true)} />}
        <main className={styles.main}>{children}</main>
        {isMobilePWA && <MobileNav />}
      </div>
    </div>
  );
}
