import { ReactNode } from "react";
import styles from "./TermsNote.module.css";

type Props = {
  /** Contenu de la note, généralement un court paragraphe de mise en garde */
  children: ReactNode;
};

/**
 * Bloc de note contextuelle pour les sections légales.
 *
 * Wrapper minimal autour d'une `<div>` appliquant les styles
 * définis dans `TermsNote.module.css`. Utilisé pour les avertissements
 * et précisions juridiques (ex : allergènes, droits d'auteur sur les recettes).
 *
 * @example
 * <TermsNote>
 *   Les listes d'ingrédients ne sont pas protégeables par le droit d'auteur.
 * </TermsNote>
 */
export function TermsNote({ children }: Props) {
  return <div className={styles.note}>{children}</div>;
}