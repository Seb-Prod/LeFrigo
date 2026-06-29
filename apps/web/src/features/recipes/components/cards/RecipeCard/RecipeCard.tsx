import { SafeRecipeSummary } from "@lefrigo/shared";
import Link from "next/link";
import Image from "next/image";
import styles from "./RecipeCard.module.css";
import { TbClock, TbUsers } from "react-icons/tb";
import { Text } from "@/components/ui";
import { getRandomDevImage } from "@/helpers/getRandomDevImage";
import clsx from "clsx";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  recipe: SafeRecipeSummary;
  variant?: "grid" | "scroll";
};

/**
 * Card recette en format portrait — image, nom, temps total, portions.
 *
 * États visuels :
 * - Image disponible  : photo de la recette en cover
 * - Image manquante   : placeholder emoji centré
 *
 * Cliquable — navigue vers `/recipes/:id`.
 */
export function RecipeCard({ recipe, variant = "grid" }: Props) {
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
        <div className={styles.meta}>
          {totalTime > 0 && (
            <span className={styles.metaItem}>
              <TbClock /> {totalTime} min
            </span>
          )}
          {recipe.servings && (
            <span className={styles.metaItem}>
              <TbUsers /> {recipe.servings}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
