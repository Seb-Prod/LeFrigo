"use client";

import { useDevice } from "@/contexts/device.context";
import styles from "./Topbar.module.css";

export default function Topbar() {
  const { isMobile } = useDevice();

  return (
    <header className={styles.topbar}>
      {isMobile && (
        <button>
          ☰
        </button>
      )}
      <span>Topbar</span>
    </header>
  );
}
