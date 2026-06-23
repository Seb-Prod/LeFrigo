"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./MobileNav.module.css";
import {
  MdCalendarMonth,
  MdDashboard,
  MdMenuBook,
  MdSettings,
} from "react-icons/md";
import clsx from "clsx";
import { NAVIGATION } from "@/lib/navigation";

/* ── Définition des liens de navigation ──────────────────── */
const links = [
  { label: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
  { label: "Recettes", href: "/recipes", icon: <MdMenuBook /> },
  { label: "Planning", href: "/planning", icon: <MdCalendarMonth /> },
  { label: "Paramètres", href: "/settings", icon: <MdSettings /> },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Barre de navigation mobile fixée en bas d'écran.
 * - Met en surbrillance l'item correspondant à la route active.
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.navigation}>
      <ul>
        {NAVIGATION.map((link) => {
          const Icon = link.icon;

          return (
            <li
              key={link.href}
              className={clsx(
                styles.list,

                isActivePath(pathname, link.href) && styles.active,
              )}
            >
              <Link href={link.href}>
                <span className={styles.icon}>
                  <Icon />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
