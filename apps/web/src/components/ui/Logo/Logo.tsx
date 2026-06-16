import Image from "next/image";
import styles from "./Logo.module.css";

const SIZE_MAP = {
  sm: 48,
  md: 64,
  lg: 80,
} as const;

type LogoSize = keyof typeof SIZE_MAP;

/** Variante du logo affiché : application ou développeur (crédit). */
type LogoVariant = "app" | "dev";

const SRC_MAP: Record<LogoVariant, { src: string; alt: string }> = {
  app: { src: "/images/logos/app.png", alt: "Logo de l'application" },
  dev: { src: "/images/logos/sebprod.png", alt: "Logo du développeur" },
};

type Props = {
  size?: LogoSize;
  variant?: LogoVariant;
};

/**
 * Logo
 *
 * Affiche le logo de l'application ou celui du développeur,
 * dans un cercle de taille configurable.
 */
export function Logo({ size = "md", variant = "app" }: Props) {
  const px = SIZE_MAP[size];
  const { src, alt } = SRC_MAP[variant];

  return (
    <div className={styles.circle} style={{ width: px, height: px }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${px}px`}
        style={{ objectFit: "contain" }}
        className={styles.logo}
      />
    </div>
  );
}