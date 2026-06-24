import { Highlight, Text } from "@/components/ui";
import styles from "./TermsFooter.module.css";
import { EDITOR } from "@/features/terms/constant/editor";

/**
 * Pied de page de la page légale.
 *
 * Affiche un disclaimer de version bêta, la date de mise à jour
 * et l'adresse de contact de l'éditeur.
 *
 * @example
 * <TermsFooter />
 */
export function TermsFooter() {
  return (
    <footer className={styles.footer}>
      {/* ── Disclaimer · version · contact ── */}
      <Text size="sm" align="center" className={styles.footerText}>
        Document non contractuel — Version bêta — {EDITOR.version}
        <br />
        Pour toute question : <Highlight>{EDITOR.email}</Highlight>
      </Text>
    </footer>
  );
}