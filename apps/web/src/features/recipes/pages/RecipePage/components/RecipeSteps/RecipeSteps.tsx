import { RecipeStepItem } from "@lefrigo/shared";
import { Heading } from "@/components/ui";
import { Badge } from "@/components/ui/Badge/Badge";
import styles from "./RecipeSteps.module.css";

type Props = {
  steps: RecipeStepItem[];
  /** Si `true`, affiche un squelette animé à la place du contenu réel */
  isSkeleton?: boolean;
};

/**
 * Liste ordonnée des étapes de préparation d'une recette.
 *
 * Trie les étapes par `position` avant le rendu. Chaque étape affiche
 * un badge numéroté suivi de l'instruction, séparés par une ligne fine.
 * Supporte un mode squelette via `isSkeleton` pour les états de chargement.
 *
 * @remarks
 * - Le tri est effectué sur une copie (`[...steps]`) pour ne pas muter
 *   le tableau passé en prop.
 * - Le composant retourne `null` si `steps` est vide et `isSkeleton` est `false`.
 * - Le squelette simule 5 étapes avec badge et bloc de texte.
 *
 * @example
 * <RecipeSteps steps={recipe.steps} isSkeleton={false} />
 */
export function RecipeSteps({ steps, isSkeleton }: Props) {
  /* ── Mode squelette ── */

  if (isSkeleton) {
    return (
      <section className={styles.section}>
        {/* ── Titre ── */}
        <div className={styles.skeletonTitle} />

        {/* ── Étapes fictives ── */}
        <div className={styles.skeletonList}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.skeletonItem}>
              <div className={styles.skeletonBadge} />
              <div className={styles.skeletonText} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ── Liste vide ── */

  if (steps.length === 0) return null;

  /** Étapes triées par position croissante */
  const sortedSteps = [...steps].sort((a, b) => a.position - b.position);

  return (
    <section className={styles.section}>
      {/* ── Titre ── */}
      <Heading>Préparation</Heading>

      {/* ── Liste des étapes ── */}
      <ol className={styles.stepList}>
        {sortedSteps.map((step, i) => (
          <li key={step.id} className={styles.stepItem}>
            {/* ── Numéro ── */}
            <Badge>{i + 1}</Badge>

            {/* ── Instruction ── */}
            <p className={styles.stepInstruction}>{step.instruction}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}