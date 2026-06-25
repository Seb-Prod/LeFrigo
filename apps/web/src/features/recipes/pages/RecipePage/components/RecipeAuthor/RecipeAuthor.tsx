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
  /** Si `true`, affiche un squelette animé à la place du contenu réel */
  isSkeleton?: boolean;
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
 * Supporte un mode squelette via `isSkeleton` pour les états de chargement.
 *
 * @remarks
 * - Les dates ISO sont formatées en français via `Intl.DateTimeFormat`.
 * - La date de modification n'est affichée que si elle diffère de la création.
 * - Le badge `PUBLISHED` affiche une chaîne vide — masqué visuellement
 *   mais conservé pour cohérence avec `STATUS_LABEL`.
 * - Le badge applique une classe modificatrice `badge{STATUS}` pour
 *   un code couleur sémantique via CSS Modules.
 *
 * @example
 * <RecipeAuthor
 *   userName="marie"
 *   status="PUBLISHED"
 *   createdAt="2024-03-01T10:00:00Z"
 *   updatedAt="2024-03-15T14:30:00Z"
 * />
 */
export function RecipeAuthor({
  userName,
  status,
  createdAt,
  updatedAt,
  isSkeleton = false,
}: Props) {
  /* ── Mode squelette ── */

  if (isSkeleton) {
    return (
      <footer className={styles.author}>
        {/* ── Ligne auteur + badge ── */}
        <div className={styles.skeletonRow}>
          <div className={styles.skeletonAuthor} />
          <div className={styles.skeletonBadge} />
        </div>

        {/* ── Ligne dates ── */}
        <div className={styles.skeletonRow}>
          <div className={styles.skeletonDate} />
          <div className={styles.skeletonDateShort} />
        </div>
      </footer>
    );
  }

  /* ── Formatage des dates ── */

  /** Formateur de date court en français */
  const fmt = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" });

  /** Formate une date ISO en français, retourne "-" si la valeur est invalide */
  const formatDate = (raw: string): string => {
    const d = new Date(raw);
    return isNaN(d.getTime()) ? "-" : fmt.format(d);
  };

  /** Date de création formatée */
  const dateCreated = formatDate(createdAt);

  /** Date de dernière modification formatée */
  const dateUpdated = formatDate(updatedAt);

  return (
    <footer className={styles.author}>
      {/* ── Ligne auteur + statut ── */}
      <div className={styles.row}>
        <Text size="sm" variant="muted">
          Recette ajoutée par{" "}
          <strong className={styles.userName}>{userName}</strong>
        </Text>

        {/* Badge coloré selon le statut de modération */}
        <span className={[styles.badge, styles[`badge${status}`]].join(" ")}>
          {STATUS_LABEL[status]}
        </span>
      </div>

      {/* ── Ligne dates ── */}
      <div className={styles.row}>
        <Text size="sm" variant="muted">
          Créée le {dateCreated}
        </Text>

        {/* Modification affichée uniquement si différente de la création */}
        {dateUpdated !== dateCreated && (
          <Text size="sm" variant="muted">
            · Modifiée le {dateUpdated}
          </Text>
        )}
      </div>
    </footer>
  );
}