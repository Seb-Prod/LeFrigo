import styles from "./RecipeDescription.module.css";
import { Text } from "@/components/ui";

type Props = {
  description: string | null;
  /** Si `true`, affiche un squelette animé à la place du contenu réel */
  isSkeleton?: boolean;
};

/**
 * Affiche la description libre d'une recette.
 *
 * Composant intentionnellement minimal : délègue tout le rendu
 * typographique à `Text`. La valeur `null` est passée telle quelle —
 * `Text` est responsable de la gestion du contenu vide.
 * Supporte un mode squelette via `isSkeleton` pour les états de chargement.
 *
 * @remarks
 * Le squelette simule quatre lignes de texte dont la dernière est
 * plus courte, reproduisant la forme naturelle d'un paragraphe.
 *
 * @example
 * <RecipeDescription description="Une quiche lorraine crémeuse et dorée." isSkeleton={false} />
 */
export function RecipeDescription({ description, isSkeleton }: Props) {
  /* ── Mode squelette ── */

  if (isSkeleton) {
    return (
      <div className={styles.skeleton}>
        {/* ── Lignes pleines ── */}
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />

        {/* ── Dernière ligne courte (fin de paragraphe) ── */}
        <div className={styles.skeletonLineShort} />
      </div>
    );
  }

  /* ── Contenu réel ── */

  return <Text align="justify">{description}</Text>;
}