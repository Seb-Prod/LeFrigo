import { SafeRecipeSummary } from "@lefrigo/shared";
import Link from "next/link";
import Image from "next/image";
import styles from "./RecipeCard.module.css";
import { Column, Row, Text } from "@/components/ui";
import { getRandomDevImage } from "@/helpers/getRandomDevImage";
import { formatRelativeTime } from "@/utils/date.utils";
import clsx from "clsx";
import { MetaItem } from "../../MetaItem";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  recipe: SafeRecipeSummary;
  variant?: "grid" | "scroll";
  /** `"detailed"` : prépa + cuisson + total + portions (grille classique, page recettes).
   *  `"minimal"` : temps total uniquement — pour les listes denses (ex. scroll horizontal
   *  "recettes rapides"). Chaque info reste individuellement forçable via les props `show*`,
   *  qui priment toujours sur le layout. */
  layout?: "detailed" | "minimal";
  showPreparationTime?: boolean;
  showCookingTime?: boolean;
  showTotalTime?: boolean;
  showServings?: boolean;
  /** Affiche la date relative d'ajout (ex. "il y a 2 jours"). */
  showDate?: boolean;
  /** Précharge l'image (désactive le lazy loading). À réserver aux toutes
   *  premières cartes visibles à l'écran (ex. above the fold) — sinon,
   *  toutes les cartes d'une liste chargeraient leur image en priorité,
   *  ce qui dégrade le LCP au lieu de l'améliorer. */
  priority?: boolean;
};

/**
 * Card recette en format portrait — image, nom, temps, portions, date.
 *
 * États visuels :
 * - Image disponible  : photo de la recette en cover
 * - Image manquante   : placeholder emoji centré
 *
 * Comportement dynamique :
 * - `layout` fixe des valeurs par défaut pour les `show*` ("detailed" affiche tout,
 *   "minimal" ne garde que le temps total) ; toute prop `show*` explicite les surcharge.
 *
 * Cliquable — navigue vers `/recipes/:id`.
 */
export function RecipeCard({
  recipe,
  variant = "grid",
  layout = "detailed",
  priority = false,
  showPreparationTime,
  showCookingTime,
  showTotalTime,
  showServings,
  showDate,
}: Props) {
  const isDetailed = layout === "detailed";

  /** Résolution des props d'affichage : valeur explicite > défaut du layout. */
  const resolvedShowPreparationTime = showPreparationTime ?? isDetailed;
  const resolvedShowCookingTime = showCookingTime ?? isDetailed;
  const resolvedShowTotalTime = showTotalTime ?? true;
  const resolvedShowServings = showServings ?? isDetailed;
  const resolvedShowDate = showDate ?? false;

  const totalTime = (recipe.preparationTime ?? 0) + (recipe.cookingTime ?? 0);

  const imageSrc = recipe.imageUrl || getRandomDevImage();

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className={clsx(styles.card, variant === "scroll" && styles.cardScroll)}
    >
      {/* ── Thumbnail ── */}
      <div className={styles.thumb}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={recipe.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 200px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🍽️</span>
          </div>
        )}
      </div>

      {/* ── Infos ── */}
      <div className={styles.info}>
        <Text className={styles.name}>{recipe.name}</Text>

        <Column>
          {/* ── Prépa / cuisson ── */}
          <Row justify="spaceBetween">
            {recipe.preparationTime && resolvedShowPreparationTime && (
              <MetaItem
                recipeMeta="preparation"
                value={recipe.preparationTime}
                size="compact"
              />
            )}
            {recipe.cookingTime && resolvedShowCookingTime && (
              <MetaItem
                recipeMeta="cooking"
                value={recipe.cookingTime}
                size="compact"
              />
            )}
          </Row>

          {/* ── Total / portions ── */}
          <Row justify="spaceBetween">
            {totalTime > 0 && resolvedShowTotalTime && (
              <MetaItem recipeMeta="total" value={totalTime} size="compact" />
            )}
            {recipe.servings && resolvedShowServings && (
              <MetaItem
                recipeMeta="serving"
                value={recipe.servings}
                size="compact"
              />
            )}
          </Row>

          {/* ── Date relative ── */}
          {resolvedShowDate && recipe.createdAt && (
            <Text className={styles.date}>
              {formatRelativeTime(new Date(recipe.createdAt))} par {recipe.user.userName}
            </Text>
          )}
        </Column>
      </div>
    </Link>
  );
}