import Image from "next/image";
import styles from "./Logo.module.css";
import { ReactNode } from "react";
import { Heading } from "../Heading";
import { Highlight } from "../Highlight";

/* ── Types ─────────────────────────────────────────────────── */

const SIZE_MAP = {
  sm: 48,
  md: 64,
  lg: 80,
} as const;

type LogoSize = keyof typeof SIZE_MAP;

/** Variante du logo affiché : application ou développeur (crédit). */
type LogoVariant = "app" | "dev";

/** Ce qui est affiché : image seule, label seul, ou les deux. */
type LogoDisplay = "image" | "label" | "both";

const SRC_MAP: Record<
  LogoVariant,
  { src: string; label: ReactNode; alt: string }
> = {
  app: {
    src: "/images/logos/app.png",
    label: <Heading><Highlight>Le</Highlight>Frigo</Heading>,
    alt: "Logo de l'application",
  },
  dev: {
    src: "/images/logos/sebprod.png",
    label: <Heading>Seb-Prod</Heading>,
    alt: "Logo du développeur",
  },
};

type Props = {
  size?: LogoSize;
  variant?: LogoVariant;
  /** Ce qui est affiché — "image" par défaut */
  display?: LogoDisplay;
};

/**
 * Logo
 *
 * Affiche le logo de l'application ou celui du développeur.
 *
 * États visuels :
 * - `display="image"` (défaut) : cercle avec l'image uniquement
 * - `display="label"`          : texte/heading uniquement, sans image
 * - `display="both"`           : image + label côte à côte
 */
export function Logo({ size = "md", variant = "app", display = "image" }: Props) {
  const px = SIZE_MAP[size];
  const { src, alt, label } = SRC_MAP[variant];

  /** Image dans son cercle */
  const image = (
    <div className={styles.circle} style={{ width: px, height: px }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${px}px`}
        style={{ objectFit: "contain" }}
      />
    </div>
  );

  return (
    <div className={styles.logo}>
      {display !== "label" && image}
      {display !== "image" && label}
    </div>
  );
}