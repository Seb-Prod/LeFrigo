// components/ui/MenuItem/MenuItem.tsx

import clsx from "clsx";
import { FiChevronRight } from "react-icons/fi";
import styles from "./MenuItem.module.css";

type Props = {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  badge?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

/**
 * Item cliquable pour une liste de menu groupée.
 * Affiche une icône, un label, une description optionnelle,
 * un badge optionnel et un chevron de navigation.
 */
export function MenuItem({ icon, label, description, badge, onClick, className }: Props) {
  return (
    <div className={clsx(styles.item, className)} onClick={onClick} role="button" tabIndex={0}>

      {/* ── Gauche : icône + texte ───────────────────────── */}
      <div className={styles.left}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.text}>
          <span className={styles.label}>{label}</span>
          {description && <span className={styles.description}>{description}</span>}
        </div>
      </div>

      {/* ── Droite : badge + chevron ─────────────────────── */}
      <div className={styles.right}>
        {badge && <div className={styles.badge}>{badge}</div>}
        <FiChevronRight className={styles.chevron} />
      </div>

    </div>
  );
}