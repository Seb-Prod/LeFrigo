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
 * - Desktop : logo + menu de navigation horizontal (+ bouton retour si la page n'est pas dans le menu)
 * - Mobile : [retour ou logo] + titre de page (avec icône) + bouton burger
 *   (le bouton burger est masqué quand la sidebar est déjà ouverte)
 * Le bouton retour remplace le logo sur mobile (pattern "navigation iOS"),
 * et reste à côté du logo sur desktop.
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
      {/* ── Logo (masqué sur mobile si bouton retour) ── */}
      <div className={clsx(styles.left, page.showBackButton && styles.hideOnMobile)}>
        <Logo />
      </div>

      {/* ── Retour + titre de page ── */}
      <div className={styles.center}>
        <div className={styles.pageInfo}>
          {page.showBackButton && (
            <ButtonPrev className={styles.backButton} onClick={goBack} />
          )}
          <Icon />
          <Heading>{page.title}</Heading>
        </div>
      </div>

      {/* ── Navigation (desktop) / burger (mobile) ── */}
      <div className={styles.right}>
        {!sidebarOpen && (
          <button
            className={styles.menuButton}
            onClick={onMenuClick}
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>
        )}

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