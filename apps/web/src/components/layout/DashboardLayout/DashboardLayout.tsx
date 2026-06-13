"use client";

import { MobileNav, Sidebar, Topbar } from "@/components/layout";
import styles from "./DashboardLayout.module.css";
import { useDevice } from "@/contexts/device.context";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isMobile, isPWA } = useDevice();
  const isMobilePWA = isMobile && isPWA;



  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!isMobilePWA && (
          <>
            <Sidebar />
            <Topbar
            />
          </>
        )}
        <main className={styles.main}>{children}</main>
        {isMobilePWA && <MobileNav />}
      </div>
    </div>
  );
}
