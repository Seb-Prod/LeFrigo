"use client";

import { Button, Heading, Highlight, Text } from "@/components/ui";
import styles from "./DiscoverHero.module.css";
import { useState } from "react";
import { AuthForm } from "@/features/auth";
import { TbCalendar, TbShoppingCart, TbUsers } from "react-icons/tb";

/* ── Types ─────────────────────────────────────────────────── */

/** Fonctionnalité clé affichée dans le hero */
type Feature = {
  icon: React.ReactNode;
  label: string;
  description: string;
};

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
 * Hero de la page découverte.
 *
 * États visuels :
 * - Desktop : colonne gauche (texte + CTA) + colonne droite (features en liste)
 * - Mobile  : colonne unique + carrousel automatique infini (CSS animation)
 */
export function DiscoverHero() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className={styles.hero}>
      {/* ── Colonne gauche : texte + CTA ── */}
      <div className={styles.left}>
        <Heading size="lg">
          Planifiez vos repas,{" "}
          <Highlight variant="primary">simplifiez</Highlight> votre quotidien.
        </Heading>
        <Heading size="sm" as="h2">
          Plus de &quot;
          <Highlight variant="accent">
            Qu&apos;est-ce qu&apos;on mange ce soir&nbsp;?
          </Highlight>
          &quot;
        </Heading>
        <Text size="md">
          Organisez les repas de votre foyer, votez en famille et{" "}
          <Highlight variant="primary">LeFrigo</Highlight> planifiera vos repas
          et générera vos listes de courses automatiquement.
        </Text>
        <div className={styles.auth}>
          <Button onClick={() => openAuth("register")}>Créer un compte</Button>
          <Button variant="ghost" onClick={() => openAuth("login")}>
            Se connecter
          </Button>
        </div>
      </div>

      {/* ── Colonne droite : features ── */}
      <div className={styles.right}>
        {/* Desktop : liste statique */}
        <div className={styles.featureList}>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.label} feature={feature} />
          ))}
        </div>

        {/* Mobile : carrousel infini — items dupliqués pour le loop CSS */}
        <div className={styles.carousel} aria-hidden="true">
          <div className={styles.carouselTrack}>
            {[...FEATURES, ...FEATURES].map((feature, i) => (
              <FeatureCard key={`${feature.label}-${i}`} feature={feature} />
            ))}
          </div>
        </div>
      </div>

      <AuthForm
        key={authMode}
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}

/* ── Sous-composant ─────────────────────────────────────────── */

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{feature.icon}</div>
      <div className={styles.featureText}>
        <Text size="sm" className={styles.featureLabel}>
          {feature.label}
        </Text>
        <Text size="sm" className={styles.featureDescription}>
          {feature.description}
        </Text>
      </div>
    </div>
  );
}