import { SafeRecipeSummary } from "@lefrigo/shared";
import Link from "next/link";
import Image from "next/image";
import styles from "./RecipeCardCompact.module.css";
import { Text } from "@/components/ui";
import { getRandomDevImage } from "@/helpers/getRandomDevImage";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  recipe: SafeRecipeSummary;
};

/**
 * Card recette en format paysage — image, nom.
 *
 * États visuels :
 * - Image disponible  : photo de la recette en cover
 * - Image manquante   : placeholder emoji centré
 *
 * Cliquable — navigue vers `/recipes/:id`.
 */
export function RecipeCardCompact({ recipe }: Props) {

  const imageSrc = recipe.imageUrl || getRandomDevImage();

  return (
    <Link href={`/recipes/${recipe.id}`} className={styles.card}>
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
      </div>
    </Link>
  );
}