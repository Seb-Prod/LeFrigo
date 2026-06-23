import Image from "next/image";
import styles from "./RecipeHero.module.css";
import { Heading } from "@/components/ui";

type Props = {
  /** URL de l'image de la recette (optionnelle) */
  imageUrl?: string | null;
  /** Nom de la recette */
  name: string;
};

/**
 * Hero de recette affichant une image principale et le titre.
 * Gère automatiquement l'absence d'image avec un placeholder.
 */
export function RecipeHero({ imageUrl, name }: Props) {
  return (
    <section className={styles.content}>
      {/* ── Image ───────────────────────────── */}
      <div className={styles.thumb}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Photo de la recette : ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: "cover" }}
            priority
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon} aria-hidden="true">
              🍽️
            </span>
          </div>
        )}

        {/* ── Overlay titre ─────────────────── */}
        <div className={styles.titleOverlay}>
          <Heading align="center" className={styles.name}>
            {name}
          </Heading>
        </div>
      </div>
    </section>
  );
}