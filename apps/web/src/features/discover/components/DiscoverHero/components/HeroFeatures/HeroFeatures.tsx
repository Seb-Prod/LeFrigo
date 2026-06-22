import { TbCalendar, TbShoppingCart, TbUsers } from "react-icons/tb";
import { FeatureCard } from "../FeatureCard";
import { Feature } from "../FeatureCard/FeatureCard";
import styles from "./HeroFeatures.module.css";

/* ── Constantes ────────────────────────────────────────────── */

/** Fonctionnalités clés mises en avant dans le hero */
const FEATURES: Feature[] = [
  {
    icon: <TbCalendar />,
    label: "Planning repas",
    description: "Planifiez votre semaine en quelques clics.",
  },
  {
    icon: <TbUsers />,
    label: "Vote en famille",
    description: "Chaque membre propose et vote pour ses repas.",
  },
  {
    icon: <TbShoppingCart />,
    label: "Liste de courses",
    description: "Générée automatiquement depuis votre planning.",
  },
];

/**
 * Affiche les fonctionnalités principales de l'application.
 *
 * États visuels :
 * - Desktop : liste statique des fonctionnalités.
 * - Mobile : carrousel infini animé via CSS.
 */
export function HeroFeatures() {
  return (
    <div className={styles.right}>
      {/* ── Liste desktop ── */}
      <div className={styles.featureList}>
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.label} feature={feature} />
        ))}
      </div>

      {/* ── Carrousel mobile ── */}
      <div className={styles.carousel} aria-hidden="true">
        <div className={styles.carouselTrack}>
          {[...FEATURES, ...FEATURES].map((feature, i) => (
            <FeatureCard key={`${feature.label}-${i}`} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}