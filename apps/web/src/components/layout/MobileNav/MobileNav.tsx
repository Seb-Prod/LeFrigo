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

/* ── Définition des liens de navigation ──────────────────── */
const links = [
  { label: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
  { label: "Recettes", href: "/recipes", icon: <MdMenuBook /> },
  { label: "Planning", href: "/planning", icon: <MdCalendarMonth /> },
  { label: "Paramètres", href: "/settings", icon: <MdSettings /> },
];

/**
 * Barre de navigation mobile fixée en bas d'écran.
 * - Met en surbrillance l'item correspondant à la route active.
 * - Joue une animation organique (rebond élastique) au clic.
 */
export function MobileNav() {
  const pathname = usePathname();

  /* Href du dernier item cliqué — déclenche l'animation */
  const [pressing, setPressing] = useState<string | null>(null);

  /** Lance l'animation et la retire après qu'elle soit terminée. */
  function handlePress(href: string) {
    setPressing(href);
    setTimeout(() => setPressing(null), 450); /* durée = animation CSS */
  }

  return (
    <nav className={styles.navigation}>
      <ul>
        {links.map((link) => {
          const isActive = pathname === link.href;
          const isPressing = pressing === link.href;

          return (
            <li
              key={link.href}
              className={clsx(
                styles.list,
                isActive && styles.active,
                isPressing && styles.pressing,
              )}
            >
              {/* ── Lien avec déclenchement de l'animation ── */}
              <Link href={link.href} onMouseDown={() => handlePress(link.href)}>
                <span className={styles.icon}>{link.icon}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
