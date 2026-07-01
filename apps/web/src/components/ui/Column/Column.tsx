import { ReactNode } from "react";
import styles from "./Column.module.css";

type Props = {
  children: ReactNode;
};

/**
 * Conteneur générique alignant ses enfants horizontalement.
 *
 * Composant purement structurel — aucun état ni comportement dynamique,
 * le style est entièrement délégué à `Row.module.css`.
 */
export function Column({ children }: Props) {
  return <div className={styles.column}>{children}</div>;
}