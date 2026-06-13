"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import styles from "./Sidebar.module.css";
import { NAVIGATION, isActivePath } from "@/lib/navigation/navigation";
import {
  ButtonBurger,
  DevCredit,
  Heading,
  Logo,
} from "@/components/ui";
import { LogoutButton } from "@/features/auth";
import { useAuth } from "@/contexts/auth.context";

/**
 * Sidebar
 *
 * Panneau de navigation latéral, responsive (mobile-first).
 *
 * États visuels :
 * - Fermé (défaut sur mobile) : panneau hors écran, overlay invisible
 * - Ouvert : panneau visible, overlay affiché derrière, scroll du body bloqué
 *
 * Comportements dynamiques :
 * - Le clic sur l'overlay ferme le panneau
 * - Le clic sur un lien de nav ferme le panneau (utile sur mobile)
 * - Le bouton burger bascule l'état ouvert/fermé
 * - Le lien actif est mis en évidence via `isActivePath`
 */
export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useAuth();

  /** Bloque le scroll du body tant que le panneau est ouvert. */
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
      <aside
        className={clsx(styles.sidebarWrap, isOpen && styles.sidebarWrapOpen)}
      >
        <nav className={styles.sideBar}>
          {/* ── Logo + titre ── */}
          <div className={styles.logoArea}>
            <Logo />
            <Heading>LeFrigo</Heading>
          </div>

          {/* ── Liens de navigation ── */}
          <ul>
            {NAVIGATION.map((link) => {
              const Icon = link.icon;
              const active = isActivePath(pathname, link.href);

              return (
                <li key={link.href} className={clsx(active && styles.active)}>
                  <Link
                    href={link.href}
                    className={styles.navLink}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* ── Pied de sidebar ── */}
          <div className={styles.sidebarFooter}>
            {/* ── Utilisateur connecté ── */}
            {user && <LogoutButton size="sm" onClick={logout} className={styles.button} open/>}
            {/* ── Crédit développeur ── */}
            <DevCredit />
          </div>
        </nav>
      </aside>

      {/* ── Bouton burger (mobile) ── */}
      <ButtonBurger
        className={clsx(styles.burger, isOpen && styles.burgerOpen)}
        onClick={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
      />
    </>
  );
}
