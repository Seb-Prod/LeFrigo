import Image from "next/image";

import styles from "./RecipesTopbar.module.css";
import { Heading, Logo, Text } from "@/components/ui";

export function RecipesTopbar() {
  return (
    <section className={styles.content}>
      <div className={styles.thumb}>
        <Image
          src="/images/background_01.jpg"
          alt="Une sélection de recettes gourmandes."
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />

        <div className={styles.overlay} />

        <div className={styles.titleOverlay}>
          <Logo size="sm" display="both"/>

          <Heading size="lg">Trouvez votre prochaine recette</Heading>

          <Text>
            Plus de 500 recettes simples, rapides et gourmandes pour toutes les
            les envies.
          </Text>

          {/* SearchBar */}
        </div>
      </div>
    </section>
  );
}