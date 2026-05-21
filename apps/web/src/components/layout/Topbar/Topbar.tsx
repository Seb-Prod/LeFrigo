"use client";

import { useDevice } from "@/contexts/device.context";
import styles from "./Topbar.module.css";

type Props = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: Props) {
  const { isMobile } = useDevice();

  return (
    <header className={styles.topbar}>
      {isMobile && (
        <button className={styles.menuButton} onClick={onMenuClick}>
          ☰
        </button>
      )}
      <span>LeFrigo</span>
    </header>
  );
}
