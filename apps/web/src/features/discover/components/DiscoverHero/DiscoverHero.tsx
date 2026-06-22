import { HeroContent } from "./components/HeroContent/HeroContent";
import { HeroFeatures } from "./components/HeroFeatures";

import styles from "./DiscoverHero.module.css";

/**
 * Hero principal de la page découverte.
 *
 * Présente la proposition de valeur de l'application
 * ainsi que ses principales fonctionnalités.
 *
 * États visuels :
 * - Desktop : disposition en deux colonnes (contenu + fonctionnalités).
 * - Mobile : affichage vertical avec carrousel des fonctionnalités.
 */
export function DiscoverHero() {
  return (
    <div className={styles.hero}>
      {/* ── Contenu marketing ── */}
      <HeroContent />

      {/* ── Fonctionnalités mises en avant ── */}
      <HeroFeatures />
    </div>
  );
}