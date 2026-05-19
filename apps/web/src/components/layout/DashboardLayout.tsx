"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import styles from "./DashboardLayout.module.css";
import { useDevice } from "@/contexts/device.context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile } = useDevice();

  return (
    <div className={styles.container}>
      {!isMobile && <Sidebar/>}

      <div className={styles.content}>
        <Topbar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
