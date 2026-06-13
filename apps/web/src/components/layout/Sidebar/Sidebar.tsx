"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import styles from "./Sidebar.module.css";
import { NAVIGATION, isActivePath } from "@/lib/navigation/navigation";
import { Button, ButtonBurger, ButtonInfo } from "@/components/ui";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Overlay (visible uniquement quand ouvert) ── */}
      <div
        className={clsx(styles.overlay, !isOpen && styles.overlayHidden)}
        onClick={() => setIsOpen(false)}
      />

      {/* ── Panneau latéral ── */}
      <aside className={clsx(styles.sidebar, isOpen && styles.sidebarOpen)}>
        <h2 className={styles.logo}>LeFrigo</h2>

        <nav>
          <ul className={styles.menu}>
            {NAVIGATION.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  styles.link,
                  isActivePath(pathname, link.href) && styles.active,
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </nav>
      </aside>

      {/* ── Burger : toujours visible, suit le bord de la sidebar ── */}
      {/* <ButtonInfo
        className={clsx(styles.burger, isOpen && styles.burgerOpen)}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        
      </ButtonInfo> */}
      <ButtonBurger
        className={clsx(styles.burger, isOpen && styles.burgerOpen)}
        onClick={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
      />
    </>
  );
}
