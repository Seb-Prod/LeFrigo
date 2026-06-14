"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./SplashScreen.module.css";
import { Logo } from "@/components/ui";
import clsx from "clsx";

/** Phrases défilantes pendant le chargement */
const TAGLINES = [
  "La cuisine, décidée ensemble",
  "Plus de 'on mange quoi ce soir ?'",
  "Du vote à l'assiette",
  "Tout le monde à table, tout le monde d'accord",
  "Planifie, vote, mange",
];

type Props = {
  ready: boolean;
  onFinished: () => void;
};

/**
 * SplashScreen — écran de démarrage affiché jusqu'à ce que l'app soit prête.
 *
 * Séquence d'animation :
 * 1. Repos : blob morph + float, appName fixe, taglines défilantes toutes les 2s
 * 2. Absorption (ready=true) : cycle en cours terminé, puis texte absorbé dans le blob
 * 3. Expand : blob recouvre l'écran → onFinished()
 */
export function SplashScreen({ ready, onFinished }: Props) {
  /** Index de la tagline actuellement affichée */
  const [taglineIndex, setTaglineIndex] = useState(0);

  /** Contrôle le fondu : false = fade out, true = fade in */
  const [visible, setVisible] = useState(true);

  /** Verrouille le cycle quand ready=true pour ne pas interrompre un fondu */
  const lockedRef = useRef(false);

  /** Phase d'exit globale (absorption + expand) */
  const [exiting, setExiting] = useState(false);

  // ── Cycle des taglines ──────────────────────────────────────
  useEffect(() => {
    if (exiting) return;

    const interval = setInterval(() => {
      /** Fade out */
      setVisible(false);

      setTimeout(() => {
        setTaglineIndex(prev => {
          const next = (prev + 1) % TAGLINES.length;
          return next;
        });

        /** Fade in — si ready entre-temps, on verrouille après ce cycle */
        setVisible(true);

        if (lockedRef.current) {
          setExiting(true);
        }
      }, 400); /** durée du fade out avant swap */

    }, 2200); /** durée d'affichage de chaque tagline */

    return () => clearInterval(interval);
  }, [exiting]);

  // ── Déclenchement de l'exit quand ready=true ────────────────
  useEffect(() => {
    if (!ready) return;
    /** On laisse le cycle en cours se terminer */
    lockedRef.current = true;
  }, [ready]);

  // ── onFinished après la séquence complète ───────────────────
  useEffect(() => {
    if (!exiting) return;
    /** absorption (700ms) + expand (1200ms) */
    const timer = setTimeout(onFinished, 100 + 100);
    return () => clearTimeout(timer);
  }, [exiting, onFinished]);

  return (
    <div className={clsx(styles.container, exiting && styles.exit)}>

      {/* ── Blob morphant ── */}
      <div className={clsx(styles.blob, exiting && styles.blobAbsorbing)}>

        {/* ── Groupe texte ── */}
        <div className={clsx(styles.textGroup, exiting && styles.textExit)}>
          <Logo/>
          <span className={styles.appName}>LeFrigo</span>

          {/* ── Tagline défilante ── */}
          <span className={clsx(styles.tagline, visible ? styles.taglineVisible : styles.taglineHidden)}>
            {TAGLINES[taglineIndex]}
          </span>

          {/* ── Dots de chargement ── */}
          <div className={styles.dots}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        </div>

      </div>

      {/* ── Crédit développeur ── */}
      <div className={clsx(styles.credit, exiting && styles.creditExit)}>
        <Logo variant="dev"/>
        <div className={styles.creditBody}>
          <span className={styles.creditName}>Seb-Prod</span>
          <span className={styles.creditSub}>© {new Date().getFullYear()} · v1.0.0 · Tous droits réservés</span>
        </div>
      </div>

    </div>
  );
}