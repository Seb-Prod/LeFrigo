import styles from "./RecipeSection.module.css";
import { Heading, Text } from "@/components/ui";
import Link from "next/link";
import { RecipeCardSkeleton } from "../cards/RecipeCardSkeleton";
import { RecipeCard } from "../cards/RecipeCard";
import { SafeRecipeSummary } from "@lefrigo/shared";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  /** Titre principal de la section (ex. "Pas le courage de cuisiner"). */
  title: string;
  /** Sous-titre optionnel décrivant le critère de filtre appliqué. */
  subtitle?: string;
  /** Href du lien "Voir tout" — chaîne vide pour désactiver. */
  seeAllHref: string;
  /** Liste des recettes à afficher. */
  recipes: SafeRecipeSummary[];
  /** Affiche les skeletons à la place des cartes pendant le chargement. */
  isLoading: boolean;
  /** Si `true`, la section se masque (le parent gère l'affichage de l'erreur). */
  hasError: boolean;
};

/**
 * Section générique de recettes en scroll horizontal (style Netflix).
 *
 * États visuels :
 * - Chargement   : 5 `RecipeCardSkeleton` côte à côte
 * - Données      : rangée scrollable de `RecipeCard` en variant `"scroll"`
 * - Vide / erreur : `null` — la section disparaît silencieusement
 *
 * @remarks
 * Le guard `hasError || vide` est géré ici — les sections parentes
 * n'ont pas besoin de le dupliquer.
 *
 * @example
 * <RecipeSection
 *   title="Pas le courage de cuisiner"
 *   subtitle="Préparation ≤ 10 min"
 *   seeAllHref="/recipes?filter=quick-prep"
 *   recipes={recipes}
 *   isLoading={loading}
 *   hasError={error}
 * />
 */
export function RecipeSection({
  title,
  subtitle,
  seeAllHref,
  recipes,
  isLoading,
  hasError,
}: Props) {
  /* ── Gestion des états sans contenu ─────────────────────── */

  if (hasError || (!isLoading && recipes.length === 0)) {
    return null;
  }

  return (
    <section className={styles.section}>
      {/* ── En-tête ── */}
      <div className={styles.header}>
        <div>
          <Heading size="sm" as="h2">
            {title}
          </Heading>
          {subtitle && <Text>{subtitle}</Text>}
        </div>

        <Link href={seeAllHref} className={styles.seeAll}>
          Voir plus
        </Link>
      </div>

      {/* ── Grille scrollable ── */}
      <div className={styles.grid}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <RecipeCardSkeleton variant="scroll" key={i} />
            ))
          : recipes.map((recipe) => (
              <RecipeCard variant="scroll" key={recipe.id} recipe={recipe} />
            ))}
      </div>
    </section>
  );
}
