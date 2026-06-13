"use client";

import { usePathname } from "next/navigation";
import styles from "./Topbar.module.css";
import { getPageConfig } from "@/lib/navigation";
import { ButtonPrev, Text, Logo, NavLink } from "@/components/ui";
import { useBack } from "@/hooks";
import { NAVIGATION } from "@/lib/navigation/navigation";
import { LogoutButton } from "@/features/auth";
import { useAuth } from "@/contexts/auth.context";

/**
 * Topbar
 *
 * Barre de navigation supérieure, translucide avec flou d'arrière-plan.
 * Utilise les mêmes variables CSS que la Sidebar (--color-surface, --color-primary-solid).
 *
 * États visuels :
 * - Page racine : logo centré + nav horizontale à droite
 * - Page secondaire : bouton retour + icône + titre à la place du logo
 *
 * Comportements dynamiques :
 * - `getPageConfig` détermine le titre, l'icône et si le bouton retour est visible
 * - La nav horizontale est masquée sur mobile via media query (la sidebar prend le relais)
 */
export function Topbar() {
  const pathname = usePathname();
  const goBack = useBack();
  const { user, logout } = useAuth();

  const page = getPageConfig(pathname);

  return (
    <header className={styles.topbar}>
      {/* ── Logo ou [retour + titre de page] ── */}
      <div className={styles.center}>
        {page.showBackButton ? (
          <div className={styles.pageInfo}>
            <ButtonPrev className={styles.backButton} onClick={goBack} />
            <Text>{page.title}</Text>
          </div>
        ) : (
          <Logo />
        )}
      </div>

      {/* ── Navigation (desktop uniquement) ── */}
      <div className={styles.right}>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            {NAVIGATION.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
            {user && (
              <li>
                <LogoutButton
                  size="sm"
                  onClick={logout}
                  className={styles.button}
                  open
                />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
