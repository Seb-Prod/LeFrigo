"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";
import { ButtonNext, ButtonPrev, Text } from "@/components/ui";
import { IoImageOutline } from "react-icons/io5";

export type CarouselSlide = {
  /** Nom du fichier image dans /public (ex: "step-1.png") */
  src: string;
  /** Contenu affiché sous l'image */
  label: ReactNode;
  /** Texte alternatif pour l'image. Par défaut : src */
  alt?: string;
};

type Props = {
  slides: CarouselSlide[];
  /** Dossier de base dans /public (ex: "/pwa/ios") */
  basePath: string;
};

/**
 * Carousel pas-à-pas.
 *
 * États visuels :
 *  - Image valide  : Next/Image avec objectFit contain
 *  - Image absente : placeholder centré avec icône IoImageOutline
 *
 * Comportements dynamiques :
 *  - Navigation prev/next clampée à [0, slides.length - 1]
 *  - Dots cliquables pour accès direct à une slide
 *  - imgError reset automatiquement à chaque changement de slide
 */
export function Carousel({ slides, basePath }: Props) {
  const [current, setCurrent] = useState(0);

  /** Ensemble des indices de slides dont l'image a échoué à charger */
  const [erroredSlides, setErroredSlides] = useState<Set<number>>(new Set());

  /** Marque l'index courant comme en erreur */
  function handleImgError() {
    setErroredSlides((prev) => new Set(prev).add(current));
  }

  /** Recule d'une slide, sans dépasser 0 */
  function prev() {
    setCurrent((i) => Math.max(0, i - 1));
  }

  /** Avance d'une slide, sans dépasser la dernière */
  function next() {
    setCurrent((i) => Math.min(slides.length - 1, i + 1));
  }

  const slide = slides[current];

  return (
    <div className={styles.carousel}>
      {/* ── Image encadrée par les boutons prev/next ── */}
      <div className={styles.imageNav}>
        <ButtonPrev onClick={prev} disabled={current === 0} />

        <div className={styles.imageWrapper}>
          {erroredSlides.has(current) ? (
            // Fallback affiché si le fichier image est introuvable
            <div className={styles.placeholder}>
              <IoImageOutline />
            </div>
          ) : (
            <Image
              src={`/images/${basePath}/${slide.src}`}
              alt={slide.alt ?? slide.src}
              fill
              style={{ objectFit: "contain" }}
              onError={handleImgError}
            />
          )}
        </div>

        <ButtonNext onClick={next} disabled={current === slides.length - 1} />
      </div>

      {/* ── Label de l'étape courante ── */}
      <Text as="span">{slide.label}</Text>

      {/* ── Dots de navigation ── */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={[styles.dot, i === current ? styles.dotActive : ""].join(
              " ",
            )}
          />
        ))}
      </div>
    </div>
  );
}
