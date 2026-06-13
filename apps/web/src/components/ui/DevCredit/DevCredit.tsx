import clsx from "clsx";
import styles from "./DevCredit.module.css";
import { Logo } from "../Logo";

type Props = {
  className?: string;
};

/**
 * DevCredit
 *
 * Bloc de crédit développeur (logo + nom + copyright/version).
 * Réutilisé dans le SplashScreen et le pied de la Sidebar.
 */
export function DevCredit({ className }: Props) {
  return (
    <div className={clsx(styles.credit, className)}>
      <Logo variant="dev" />

      {/* ── Infos texte ── */}
      <div className={styles.creditBody}>
        <span className={styles.creditName}>Seb-Prod</span>
        <span className={styles.creditSub}>
          © {new Date().getFullYear()} · v1.0.0
        </span>
        <span className={styles.creditSub}>Tous droits réservés</span>
      </div>
    </div>
  );
}