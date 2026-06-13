"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "./Topbar.module.css";
import { getPageConfig } from "@/lib/navigation";
import { ButtonPrev, Heading, Logo, NavLink } from "@/components/ui";
import { useBack } from "@/hooks";
import { NAVIGATION } from "@/lib/navigation/navigation";

type Props = {
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

/**
 * Topbar
 * Barre de navigation supérieure, sticky et translucide.
 * - Desktop : logo/retour à gauche + menu de navigation horizontal à droite
 * - Mobile : burger à gauche (côté d'apparition de la sidebar, animé en croix
 *   quand ouvert) + logo ou [retour + titre de page] au centre
 * Le bouton retour remplace le logo (pattern "navigation iOS") quand la page
 * n'appartient pas au menu principal.
 * La bascule mobile/desktop est gérée entièrement en CSS (media queries),
 * sans dépendre du contexte device.
 */
export function Topbar({ onMenuClick, sidebarOpen }: Props) {
  const pathname = usePathname();
  const goBack = useBack();

  const page = getPageConfig(pathname);
  const Icon = page.icon;

  return (
    <header className={styles.topbar}>
      {/* ── Burger (mobile uniquement, côté sidebar) ── */}
      <div className={styles.left}>
        <button
          className={clsx(styles.menuButton, sidebarOpen && styles.open)}
          onClick={onMenuClick}
          aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={sidebarOpen}
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
      </div>

      {/* ── Logo ou [retour + titre de page] ── */}
      <div className={styles.center}>
        {page.showBackButton ? (
          <div className={styles.pageInfo}>
            <ButtonPrev className={styles.backButton} onClick={goBack} />
            <Icon />
            <Heading>{page.title}</Heading>
          </div>
        ) : (
          <Logo />
        )}
      </div>

      {/* ── Navigation (desktop) ── */}
      <div className={styles.right}>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            {NAVIGATION.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}