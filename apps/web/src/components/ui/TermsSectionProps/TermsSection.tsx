import { Heading, Text } from "@/components/ui";
import styles from "./TermsSection.module.css";

/* ── Types ──────────────────────────────────────────────────── */

interface Props {
  title: string;
  children?: React.ReactNode;
  /** Niveau sémantique du titre — `h2` pour une section principale, `h3` pour une sous-section */
  level?: "h2" | "h3";
}

/**
 * Bloc de section standardisé pour les documents juridiques (CGU, confidentialité).
 *
 * États visuels :
 * - `level="h2"` → titre md, trait de séparation supérieur visible
 * - `level="h3"` → titre sm, indentation gauche, sans trait
 */
export function TermsSection({ title, children, level = "h2" }: Props) {
  const isTop = level === "h2";

  return (
    /* ── Conteneur de section ── */
    <section className={[styles.section, isTop ? styles.sectionTop : styles.sectionSub].join(" ")}>

      {/* ── Titre ── */}
      <Heading as={level} size={isTop ? "md" : "sm"} className={styles.title}>
        {title}
      </Heading>

      {/* ── Contenu ── */}
      {children && (
        <Text as="div" align="justify" className={styles.body}>
          {children}
        </Text>
      )}
    </section>
  );
}