import { Heading, Highlight, Text } from "@/components/ui";
import styles from "./HeroContent.module.css";
import { HeroActions } from "../HeroActions/HeroActions";

/**
 * Contenu textuel principal du hero.
 *
 * Présente la promesse de valeur de l'application,
 * son accroche marketing ainsi que les actions
 * d'authentification principales.
 */
export function HeroContent() {
  return (
    <div className={styles.copy}>
      {/* ── Accroche secondaire ── */}
      <Heading size="sm" as="h2">
        Plus de &quot;
        <Highlight variant="accent">
          Qu&apos;est-ce qu&apos;on mange ce soir&nbsp;?
        </Highlight>
        &quot;
      </Heading>

      {/* ── Titre principal ── */}
      <Heading size="lg">
        Planifiez vos repas,{" "}
        <Highlight variant="primary">simplifiez</Highlight> votre quotidien.
      </Heading>

      {/* ── Description ── */}
      <Text size="md" align="justify">
        Organisez les repas de votre foyer, votez en famille et{" "}
        <Highlight variant="primary">LeFrigo</Highlight> planifiera vos repas et
        générera vos listes de courses automatiquement.
      </Text>

      {/* ── Actions principales ── */}
      <HeroActions />
    </div>
  );
}