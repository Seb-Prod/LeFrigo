import { Surface } from "@/components/ui";
import styles from "./RecipeSkeleton.module.css";
import { RecipeInfo } from "../RecipeInfo";
import { RecipeSteps } from "../RecipeSteps";
import { RecipeIngredients } from "../RecipeIngredients";
import { RecipeAuthor } from "../RecipeAuthor";
import { RecipeDescription } from "../RecipeDescription";

/**
 * Squelette de chargement de la page détail d'une recette.
 *
 * Délègue le rendu skeleton à chaque sous-composant via leur prop
 * `isSkeleton`, reproduisant fidèlement le layout réel de `RecipePage` :
 * hero, métadonnées, description, ingrédients + étapes en deux colonnes,
 * footer auteur.
 *
 * @remarks
 * - Stateless et sans props — rendu uniquement quand `state.status === "loading"`.
 * - Les props de données passées aux sous-composants (`null`, `[]`, `""`)
 *   sont des valeurs neutres ignorées quand `isSkeleton={true}`.
 * - `status` est fixé à `"PENDING"` pour satisfaire le typage de `RecipeAuthor`
 *   sans signification fonctionnelle en mode skeleton.
 *
 * @example
 * {state.status === "loading" && <RecipeSkeleton />}
 */
export function RecipeSkeleton() {
  return (
    <Surface fullScreen>
      {/* ── Hero ── */}
      <div className={styles.hero} />

      {/* ── Métadonnées chiffrées ── */}
      <RecipeInfo
        preparationTime={null}
        cookingTime={null}
        servings={null}
        isSkeleton={true}
      />

      {/* ── Description ── */}
      <RecipeDescription description={null} isSkeleton={true} />

      {/* ── Ingrédients + étapes ── */}
      <div className={styles.ligne}>
        <RecipeIngredients ingredients={[]} servings={null} isSkeleton={true} />
        <RecipeSteps steps={[]} isSkeleton={true} />
      </div>

      {/* ── Footer auteur ── */}
      <RecipeAuthor
        userName=""
        status="PENDING"
        createdAt=""
        updatedAt=""
        isSkeleton={true}
      />
    </Surface>
  );
}