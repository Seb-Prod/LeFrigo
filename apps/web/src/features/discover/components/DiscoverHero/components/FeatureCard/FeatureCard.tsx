import { Text } from "@/components/ui";
import styles from "./FeatureCard.module.css";

/* ── Types ─────────────────────────────────────────────────── */

/** Fonctionnalité clé affichée dans le hero */
export type Feature = {
  icon: React.ReactNode;
  label: string;
  description: string;
};

type Props = {
  feature: Feature;
};

/**
 * Card présentant une fonctionnalité clé de l'application.
 * Utilisée dans HeroFeatures — liste desktop et carrousel mobile.
 */
export function FeatureCard({ feature }: Props) {
  const { icon, label, description } = feature;

  return (
    <div className={styles.card}>
      {/* ── Icône ── */}
      <div className={styles.icon}>{icon}</div>

      {/* ── Texte ── */}
      <div className={styles.text}>
        <Text size="sm" className={styles.label}>{label}</Text>
        <Text size="sm" className={styles.description}>{description}</Text>
      </div>
    </div>
  );
}