import { CSSProperties, ReactNode } from "react";
import styles from "./Row.module.css";

/** Valeurs d'alignement horizontal supportées par `Row`. */
type Justify = "start" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly";

type Props = {
  children: ReactNode;
  justify?: Justify;
};

/** Correspondance prop → valeur CSS `justify-content`.
 *  Évite de dupliquer une classe par valeur possible. */
const JUSTIFY_MAP: Record<Justify, string> = {
  start: "flex-start",
  center: "center",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
};

/**
 * Conteneur générique alignant ses enfants horizontalement.
 *
 * Composant purement structurel — aucun état ni comportement dynamique.
 * L'alignement (`justify`) est transmis en variable CSS (`--row-justify`)
 * plutôt qu'en classes conditionnelles, le style restant entièrement
 * délégué à `Row.module.css`.
 */
export function Row({ children, justify = "start" }: Props) {
  /** Cast nécessaire : le typage `CSSProperties` de React ne connaît pas les custom properties. */
  const style = { "--row-justify": JUSTIFY_MAP[justify] } as CSSProperties;

  return (
    <div className={styles.row} style={style}>
      {children}
    </div>
  );
}