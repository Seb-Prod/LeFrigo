/* eslint-disable react/no-unescaped-entities */
import { Logo, Heading, Highlight, Text } from "@/components/ui";
import styles from "./TermsHeader.module.css";
import { EDITOR } from "@/features/terms/constant/editor";

/**
 * En-tête de la page des Conditions Générales d'Utilisation.
 *
 * Affiche le logo de l'application, le titre principal de la page légale,
 * ainsi qu'une ligne de métadonnées (nom de l'app, date de mise à jour, version).
 *
 * @remarks
 * Les métadonnées sont extraites de la constante `EDITOR` pour rester
 * synchronisées avec le reste de l'application sans duplication.
 *
 * @example
 * <TermsHeader />
 */
export function TermsHeader() {
  return (
    <header className={styles.header}>
      {/* ── Logo ── */}
      <Logo display="both" />

      {/* ── Titre principal ── */}
      <Heading as="h1" size="md" align="center">
        Conditions Générales d'Utilisation
        <br />& Politique de Confidentialité
      </Heading>

      {/* ── Ligne de métadonnées : app · date · version ── */}
      <Text size="sm" align="center" className={styles.meta}>
        <Highlight>{EDITOR.appName}</Highlight> — Dernière mise à jour :{" "}
        <Highlight>{EDITOR.version}</Highlight> — Version{" "}
        <Highlight>{EDITOR.release}</Highlight>
      </Text>
    </header>
  );
}