"use client";

import clsx from "clsx";
import styles from "./Surface.module.css";
import { Heading } from "../Heading";
import { useDevice } from "@/contexts/device.context";
import { ButtonPrev } from "../ButtonIcon";
import { useBack } from "@/hooks";
import { usePathname } from "next/navigation";
import { getPageConfig } from "@/lib/navigation";

type Props = {
  title?: string;
  className?: string;
  children: React.ReactNode;
  backButton?: boolean;
};

/**
 * Surface
 *
 * Conteneur de page adaptatif.
 *
 * États visuels :
 * - Desktop : surface centrée (max 500px) avec fond, bordure et padding
 * - Mobile web : pleine page sans fond ni bordure, titre masqué (déjà dans la Topbar)
 * - PWA : header avec bouton retour (si page secondaire) + titre centré
 *
 * Comportements dynamiques :
 * - `showHeader` actif uniquement sur mobile/PWA
 * - Le titre et le bouton retour ne s'affichent qu'en mode PWA
 * - `getPageConfig` détermine le titre et si le bouton retour est pertinent
 */
export function Surface({ title, backButton, className, children }: Props) {
  const { isPWA, isMobile } = useDevice();
  const pathname = usePathname();
  const page = getPageConfig(pathname);
  const goBack = useBack();

  /** Header visible sur mobile et PWA uniquement */
  const showHeader = isPWA || isMobile;

  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.card, className)}>

        {/* ── Header (mobile/PWA uniquement) ── */}
        {showHeader && (
          <div className={styles.header}>
            {/* ── Titre + retour (PWA uniquement — la Topbar web gère déjà ça) ── */}
            {isPWA && (
              <>
                {page.showBackButton && (
                  <ButtonPrev onClick={goBack} className={styles.backButton} />
                )}
                <Heading align="center" className={styles.title}>
                  {page.title}
                </Heading>
              </>
            )}
          </div>
        )}

        {/* ── Contenu ── */}
        {children}

      </div>
    </div>
  );
}