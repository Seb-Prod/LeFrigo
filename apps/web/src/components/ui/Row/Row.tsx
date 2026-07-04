import { CSSProperties, ReactNode } from "react";
import styles from "./Row.module.css";

/** Valeurs d'alignement horizontal supportées par `Row`. */
type Justify =
  | "start"
  | "center"
  | "spaceBetween"
  | "spaceAround"
  | "spaceEvenly";

type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type Props = {
  children: ReactNode;
  justify?: Justify;
  gap?: Gap;
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

/** Correspondance prop → variable CSS globale d'espacement.
 *  Réutilise les tokens `--space-*` définis globalement plutôt que
 *  de redéfinir des valeurs locales. */
const GAP_MAP: Record<Gap, string> = {
  none: "0",
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)",
  "2xl": "var(--space-2xl)",
};

/**
 * Conteneur générique alignant ses enfants horizontalement.
 *
 * Composant purement structurel — aucun état ni comportement dynamique.
 * L'alignement (`justify`) et l'espacement (`gap`) sont transmis en
 * variables CSS (`--row-justify`, `--row-gap`) plutôt qu'en classes
 * conditionnelles, le style restant entièrement délégué à `Row.module.css`.
 */
export function Row({ children, justify = "start", gap = "none" }: Props) {
  /** Cast nécessaire : le typage `CSSProperties` de React ne connaît pas les custom properties. */
  const style = {
    "--row-justify": JUSTIFY_MAP[justify],
    "--row-gap": GAP_MAP[gap],
  } as CSSProperties;

  return (
    <div className={styles.row} style={style}>
      {children}
    </div>
  );
}