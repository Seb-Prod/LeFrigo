import styles from "./RecipeAuthor.module.css";
import { Text } from "@/components/ui";

/**
 * Statut de modération d'une recette.
 *
 * - `PENDING`   — en attente de modération, non visible publiquement
 * - `PUBLISHED` — validée et visible par tous
 * - `REJECTED`  — refusée par un modérateur
 */
export type RecipeStatus = "PENDING" | "PUBLISHED" | "REJECTED";

type Props = {
  userName: string;
  status: RecipeStatus;
  createdAt: string;
  updatedAt: string;
};

/** Libellés affichés pour chaque statut de modération */
const STATUS_LABEL: Record<RecipeStatus, string> = {
  PENDING: "En attente",
  PUBLISHED: "",
  REJECTED: "Refusée",
};

/**
 * Footer discret affichant les métadonnées d'une recette.
 *
 * Présente l'auteur, le statut de modération sous forme de badge coloré,
 * et les dates de création et de dernière modification.
 *
 * @remarks
 * Les dates ISO sont formatées en français via `Intl.DateTimeFormat`.
 * Le badge de statut applique une classe modificatrice selon la valeur
 * de `status` pour un code couleur sémantique.
 *
 * @example
 * <RecipeAuthor
 *   userName="marie"
 *   status="PUBLISHED"
 *   createdAt="2024-03-01T10:00:00Z"
 *   updatedAt="2024-03-15T14:30:00Z"
 * />
 */
export function RecipeAuthor({ userName, status, createdAt, updatedAt }: Props) {
  /* ── Formatage des dates ── */

  /** Formateur de date court en français */
  const fmt = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" });

  /** Date de création formatée */
  const dateCreated = fmt.format(new Date(createdAt));

  /** Date de dernière modification formatée */
  const dateUpdated = fmt.format(new Date(updatedAt));

  return (
    <footer className={styles.author}>
      {/* ── Ligne auteur + statut ── */}
      <div className={styles.row}>
        <Text size="sm" variant="muted">
          Recette ajoutée par <strong className={styles.userName}>{userName}</strong>
        </Text>

        {/* Badge coloré selon le statut de modération */}
        <span className={[styles.badge, styles[`badge${status}`]].join(" ")}>
          {STATUS_LABEL[status]}
        </span>
      </div>

      {/* ── Ligne dates ── */}
      <div className={styles.row}>
        <Text size="sm" variant="muted">Créée le {dateCreated}</Text>
        {dateUpdated !== dateCreated && (
          <Text size="sm" variant="muted">· Modifiée le {dateUpdated}</Text>
        )}
      </div>
    </footer>
  );
}