"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import styles from "./InstallCarousel.module.css";

export type CarouselSlide = {
  /** Nom du fichier image dans /assets (ex: "step-1.png") */
  src: string;
  /** Texte explicatif affiché sous l'image */
  label: ReactNode;
};

type Props = {
  slides: CarouselSlide[];
  /** Dossier de base dans /public (ex: "/pwa/ios") */
  basePath: string;
};

/**
 * Carousel pas-à-pas pour guider l'installation PWA.
 * Affiche une image + un label par étape, avec navigation prev/next.
 */
export function InstallCarousel({ slides, basePath }: Props) {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((i) => Math.max(0, i - 1));
  }

  function next() {
    setCurrent((i) => Math.min(slides.length - 1, i + 1));
  }

  const slide = slides[current];

  return (
    <div className={styles.carousel}>

      {/* ── Image ── */}
      <div className={styles.imageWrapper}>
        <Image
          src={`${basePath}/${slide.src}`}
          alt={slide.label}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* ── Label ── */}
      <p className={styles.label}>{slide.label}</p>

      {/* ── Navigation ── */}
      <div className={styles.nav}>
        <button onClick={prev} disabled={current === 0} className={styles.navBtn}>
          ←
        </button>

        {/* ── Dots ── */}
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={[styles.dot, i === current ? styles.dotActive : ""].join(" ")}
            />
          ))}
        </div>

        <button onClick={next} disabled={current === slides.length - 1} className={styles.navBtn}>
          →
        </button>
      </div>

    </div>
  );
}