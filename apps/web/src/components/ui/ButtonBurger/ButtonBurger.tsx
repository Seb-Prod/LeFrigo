"use client";

import clsx from "clsx";
import styles from "./ButtonBurger.module.css";

type Props = {
  onClick: () => void;
  className?: string;
  isOpen?: boolean;
};

/**
 * ButtonBurger — icône hamburger animée, transformable en croix.
 *
 * États visuels clés :
 * - `isOpen` pilote la transformation via le data-attribute `data-open`,
 *   consommé par les sélecteurs CSS `.hamburger[data-open="true"]`.
 * - Fermé : trois lignes horizontales en bleu primaire.
 * - Ouvert : les lignes top/bot pivotent en croix (couleur danger), la ligne
 *   du milieu disparaît, et un cercle SVG se dessine progressivement
 *   autour de l'icône via `stroke-dashoffset`.
 *
 * Comportements dynamiques :
 * - `onClick` est déclenché au clic sur l'ensemble du conteneur (pas
 *   seulement sur les lignes), pour maximiser la zone cliquable.
 */
export function ButtonBurger({ className, onClick, isOpen = false }: Props) {
  return (
    <div
      onClick={onClick}
      data-open={isOpen}
      className={clsx(styles.hamburger, className)}
    >
      {/* ── Lignes du hamburger ── */}
      <div className={styles.burgerMain}>
        <div className={styles.burgerInner}>
          <span className={clsx(styles.line, styles.top)} />
          <span className={clsx(styles.line, styles.mid)} />
          <span className={clsx(styles.line, styles.bot)} />
        </div>
      </div>

      {/* ── Cercle de contour animé ── */}
      <div className={styles.svgMain}>
        <svg className={styles.svgCircle} viewBox="0 0 48 48">
          <path
            className={styles.path}
            d="M24,2 a22,22 0 1,1 -0.01,0"
            fill="none"
            stroke="var(--color-danger-solid-background)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}