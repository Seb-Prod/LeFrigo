"use client";

import { usePathname } from "next/navigation";
import { useDevice } from "@/contexts/device.context";
import styles from "./Topbar.module.css";
import { getPageConfig } from "@/lib/navigation";
import { ButtonPrev, Heading, Logo } from "@/components/ui";
import { useBack } from "@/hooks";

type Props = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: Props) {
  const pathname = usePathname();
  const goBack = useBack();
  const { isMobile } = useDevice();

  const page = getPageConfig(pathname);

  const Icon = page.icon;

  return (
    <header className={styles.topbar}>
      <Logo />
      {page.showBackButton && <ButtonPrev onClick={goBack} />}
      {isMobile && (
        <button className={styles.menuButton} onClick={onMenuClick}>
          ☰
        </button>
      )}

      <Icon />

      <Heading>{page.title}</Heading>
    </header>
  );
}
