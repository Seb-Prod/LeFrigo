import clsx from "clsx";
import styles from "./Surface.module.css";

type Props = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Conteneur de page adaptatif.
 *
 * Visuels clés :
 * - Desktop : card centrée (max 500px) avec fond, bordure et padding
 * - Mobile  : pleine page sans fond ni bordure — formulaire natif
 *
 * Usage :
 * ```tsx
 * <Surface>
 *   <Heading>Connexion</Heading>
 *   ...
 * </Surface>
 * ```
 */
export function Surface({ className, children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.card, className)}>
        {/* ── Contenu ── */}
        {children}
      </div>
    </div>
  );
}
