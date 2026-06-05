// components/ui/modal.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { ButtonClose } from "../ButtonIcon";
import styles from "./modal.module.css";
import clsx from "clsx";
import { Heading } from "../Heading";

type Animation = "fade" | "scale" | "slideUp" | "slideDown";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  animation?: Animation;
  dismissable?: boolean;
}

/**
 * Modal — Fenêtre de dialogue accessible et animée.
 *
 * États visuels :
 *  - Fermé  : le composant ne monte pas dans le DOM (`open === false`)
 *  - Ouvert : overlay flouté + modal centré avec animation d'entrée
 *
 * Comportements dynamiques :
 *  - Fermeture via la touche ESC (si `dismissable`)
 *  - Fermeture au clic sur l'overlay (si `dismissable`)
 *  - Bouton de fermeture toujours visible en haut à droite (position absolue)
 *  - Animation d'entrée configurable : fade | scale | slideUp | slideDown
 */
export function Modal({
  open,
  onClose,
  children,
  title,
  animation = "scale",
  dismissable = false,
}: Props) {
  /** Ferme le modal quand l'utilisateur appuie sur Escape (si dismissable) */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissable) onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [dismissable, onClose]);

  if (!open) return null;

  return (
    <>
      {/* ── Overlay ── */}
      <div
        onClick={dismissable ? onClose : undefined}
        className={styles.overlay}
      />

      {/* ── Modal ── */}
      <div className={clsx(styles.modal, styles[animation])}>
        {/* Wrapper relatif pour ancrer le bouton absolu */}
        <div className={styles.modalInner}>
          {/* ── Bouton de fermeture (absolu, haut droite) ── */}
          <ButtonClose onClick={onClose} className={styles.closeButton} />

          {/* ── Header (titre optionnel) ── */}
          {title && (
            <div className={styles.header}>
              <Heading>{title}</Heading>
            </div>
          )}

          {/* ── Contenu ── */}
          {children}
        </div>
      </div>
    </>
  );
}
