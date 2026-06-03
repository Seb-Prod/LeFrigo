// components/ui/MenuGroup/MenuGroup.tsx

import styles from "./MenuGroup.module.css";

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Groupe d'items de menu avec un titre de section.
 * Wrapper visuel de type "grouped list" iOS.
 */
export function MenuGroup({ title, children, className }: Props) {
  return (
    <div className={className}>

      {/* ── Titre de section ─────────────────────────────── */}
      {title && <p className={styles.title}>{title}</p>}

      {/* ── Items ────────────────────────────────────────── */}
      <div className={styles.group}>
        {children}
      </div>

    </div>
  );
}