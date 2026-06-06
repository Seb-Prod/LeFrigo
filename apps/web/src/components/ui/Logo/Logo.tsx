import Image from "next/image";
import styles from "./Logo.module.css";

const SIZE_MAP = {
  sm: 48,
  md: 64,
  lg: 80,
} as const;

type LogoSize = keyof typeof SIZE_MAP;

interface Props {
  size?: LogoSize;
}

export function Logo({ size = "md" }: Props) {
  const px = SIZE_MAP[size];

  return (
    <div
      className={styles.circle}
      style={{ width: px, height: px }}
    >
      <Image
        src="/images/logos/app.png"
        alt="Logo de l'application"
        fill
        style={{ objectFit: "contain" }}
        className={styles.logo}
      />
    </div>
  );
}