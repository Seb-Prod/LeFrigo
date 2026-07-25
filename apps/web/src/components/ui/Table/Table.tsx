import { type ReactNode } from "react";
import styles from "./Table.module.css";

/** Définition d'une colonne du tableau */
export type ColumnDefinition<T> = {
  /** Clé unique de la colonne (utilisée aussi comme clé React si besoin) */
  key: string;
  /** Libellé affiché dans l'en-tête */
  header: string;
  /** Fonction de rendu de la cellule pour une ligne donnée */
  render: (row: T) => ReactNode;
  /** Classe optionnelle appliquée à la cellule (ex: alignement, largeur) */
  className?: string;
};

type TableProps<T> = {
  /** Données à afficher, une entrée par ligne */
  data: T[];
  /** Colonnes à afficher, dans l'ordre */
  columns: ColumnDefinition<T>[];
  /** Extrait une clé React unique pour chaque ligne */
  getRowKey: (row: T) => string;
  /** Message affiché quand `data` est vide */
  emptyMessage?: string;
  /** Couleur sémantique de l'en-tête, résolue via l'attribut `data-color` */
  color?: string;
  /** Variante d'apparence de l'en-tête, résolue via l'attribut `data-variant` */
  variant?: string;
};

/**
 * Table générique réutilisable.
 *
 * États visuels :
 * - Cas normal : affiche une ligne par élément de `data`, une colonne par entrée de `columns`
 * - Cas vide : affiche `emptyMessage` (ou un texte par défaut) si `data` est vide
 * - Coloration : l'en-tête utilise les variables `--variant-*` résolues par la
 *   matrice CSS `[data-color] × [data-variant]` (même mécanisme que `Button`)
 *
 * Comportement dynamique :
 * - Le contenu de chaque cellule est délégué à `column.render`, ce qui permet
 *   d'afficher du texte brut, du JSX (badges, icônes, etc.) selon la colonne
 */
export function Table<T>({
  data,
  columns,
  getRowKey,
  emptyMessage = "Aucune donnée",
  color = "primary",
  variant = "solid",
}: TableProps<T>) {
  return (
    <div
      className={styles.wrapper}
      data-color={color}
      data-variant={variant}
    >
      <table className={styles.table}>
        {/* ── En-tête coloré via data-color / data-variant ── */}
        <thead className={styles.head}>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className={styles.empty} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((column) => {
                  /** Classe finale de la cellule : classe de base + classe spécifique à la colonne si fournie */
                  const cellClassName = [
                    styles.cell,
                    column.className,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <td key={column.key} className={cellClassName}>
                      {column.render(row)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}