import { Surface } from "@/components/ui";
import styles from "./TermsPage.module.css";
import {
  PrivacyPolicy,
  TermsConditions,
  TermsFooter,
  TermsHeader,
} from "./components";

/**
 * Page légale combinant CGU et Politique de Confidentialité.
 *
 * Assemble les quatre blocs de la page dans l'ordre de lecture :
 * en-tête → CGU (articles 1–8) → séparateur → confidentialité (articles 9–18) → pied de page.
 *
 * @remarks
 * Ce composant est purement structurel : aucun état, aucun effet.
 * Chaque bloc est autonome et peut être mis à jour indépendamment.
 *
 * @example
 * <TermsPage />
 */
export function TermsPage() {
  return (
    <Surface fullScreen>
      <div className={styles.page}>
        {/* ── En-tête : logo, titre, métadonnées de version ── */}
        <TermsHeader />

        {/* ── CGU : articles 1 à 8 ── */}
        <TermsConditions />

        {/* ── Séparateur visuel entre les deux documents ── */}
        <hr className={styles.separator} />

        {/* ── Politique de confidentialité : articles 9 à 18 ── */}
        <PrivacyPolicy />

        {/* ── Pied de page : disclaimer et contact ── */}
        <TermsFooter />
      </div>
    </Surface>
  );
}