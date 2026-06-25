import { RecipeStepItem } from "@lefrigo/shared";
import { Heading } from "@/components/ui";
import styles from "./RecipeSteps.module.css";
import { Badge } from "../../../../../../components/ui/Badge/Badge";

type Props = {
  steps: RecipeStepItem[];
};

/**
 * Liste ordonnée des étapes de préparation d'une recette.
 *
 * Trie les étapes par `position` avant le rendu. Chaque étape affiche
 * un numéro large en accent typographique suivi de l'instruction,
 * séparés par une ligne fine. Le composant ne rend rien si la liste
 * est vide.
 *
 * @remarks
 * Le tri est effectué sur une copie (`[...steps]`) pour ne pas muter
 * le tableau passé en prop.
 *
 * @example
 * <RecipeSteps steps={recipe.steps} />
 */
export function RecipeSteps({ steps }: Props) {
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
