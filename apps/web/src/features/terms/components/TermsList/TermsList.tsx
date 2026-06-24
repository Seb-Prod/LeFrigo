import { ReactNode } from "react";
import styles from "./TermsList.module.css";

type Props = {
  /** Éléments `<li>` à afficher dans la liste */
  children: ReactNode;
};

/**
 * Liste non ordonnée stylisée pour les sections légales.
 *
 * Wrapper minimal autour d'un `<ul>` appliquant les styles
 * définis dans `TermsList.module.css`.
 *
 * @example
 * <TermsList>
 *   <li>Première condition</li>
 *   <li>Deuxième condition</li>
 * </TermsList>
 */
export function TermsList({ children }: Props) {
  return <ul className={styles.list}>{children}</ul>;
}