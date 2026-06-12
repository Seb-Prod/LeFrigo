import clsx from "clsx";
import styles from "./Surface.module.css";
import { Heading } from "../Heading";
import { useDevice } from "@/contexts/device.context";
import { ButtonPrev } from "../ButtonIcon";
import { useBack } from "@/hooks";

type Props = {
  title?: string;
  className?: string;
  children: React.ReactNode;
  backButton?: boolean
};

/**
 * Conteneur de page adaptatif.
 *
 * Visuels clés :
 * - Desktop : surface centrée (max 500px) avec fond, bordure et padding
 * - Mobile  : pleine page sans fond ni bordure — surface native
 * - Header  : ligne avec bouton retour + titre centré
 *   - PWA : bouton retour + titre
 *   - Mobile ( web) : bouton retour seul (titre masqué, déjà présent dans la topBar mobile)
 *
 * Usage :
 * ```tsx
 * <Surface>
 *   <Heading>Connexion</Heading>
 *   ...
 * </Surface>
 * ```
 */
export function Surface({ title, backButton, className, children }: Props) {
  const { isPWA, isMobile } = useDevice();
  const goBack = useBack();

  /** Affiche le header si un bouton retour est demandé ou si on est en PWA (pour le titre) */
  const showHeader = isPWA || isMobile;

  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.card, className)}>
        {showHeader && (
          <div className={styles.header}>
            {backButton && <ButtonPrev onClick={goBack} className={styles.backButton} />}
            {/* ── Titre (masqué sur mobile : présent dans la topBar) ── */}
            {isPWA && <Heading align="center" className={styles.title}>{title}</Heading>}
          </div>
        )}
        {/* ── Contenu ── */}
        {children}
      </div>
    </div>
  );
}