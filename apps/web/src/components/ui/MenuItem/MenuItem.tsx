// components/ui/MenuItem/MenuItem.tsx

import clsx from "clsx";
import { FiChevronRight, FiExternalLink, FiLock } from "react-icons/fi";
import Link from "next/link";
import styles from "./MenuItem.module.css";

/* ── Types ── */

type Props = {
  label: string;
  icon?: React.ReactNode;
  description?: string;
  /** Élément affiché à droite — badge, toggle, texte... Masque le chevron. */
  right?: React.ReactNode;
  /** Masque le chevron sans fournir d'élément right. */
  hideChevron?: boolean;
  /** Rend un <a> via next/link. */
  href?: string;
  /** Ouvre le lien dans un nouvel onglet + icône externe. */
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  locked?: boolean;
  className?: string;
};

/**
 * Item cliquable pour une liste de menu groupée.
 *
 * Visuels clés :
 * - Avec `href`     : rendu en lien Next.js (ou <a> si external)
 * - Avec `onClick`  : rendu en <button>
 * - Avec `right`    : élément custom à droite, chevron masqué
 * - Avec `external` : icône FiExternalLink + target="_blank"
 */
export function MenuItem({
  label,
  icon,
  description,
  right,
  hideChevron = false,
  href,
  external = false,
  onClick,
  disabled = false,
  locked,
  className,
}: Props) {
  /* ── Contenu interne partagé ── */
  const content = (
    <>
      {/* ── Gauche : icône + texte ── */}
      <div className={styles.left}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.text}>
          <span className={styles.label}>{label}</span>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
      </div>

      {/* ── Droite : slot custom | icône externe | chevron ── */}
      {/* ── Droite : cadenas | slot custom | chevron ── */}
      <div className={styles.right}>
        {locked ? (
          <FiLock className={styles.lockIcon} aria-label="Accès restreint" />
        ) : (
          <>
            {right}
            {!right &&
              !hideChevron &&
              (external ? (
                <FiExternalLink className={styles.chevron} aria-hidden="true" />
              ) : (
                <FiChevronRight className={styles.chevron} aria-hidden="true" />
              ))}
          </>
        )}
      </div>
    </>
  );

  const sharedClass = clsx(
    styles.item,
    disabled && styles.disabled,
    locked && styles.locked,
    className,
  );

  /* ── Lien externe ── */
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClass}
      >
        {content}
      </a>
    );
  }

  /* ── Lien interne Next.js ── */
  if (href) {
    return (
      <Link href={href} className={sharedClass}>
        {content}
      </Link>
    );
  }

  /* ── Bouton ── */
  return (
    <button className={sharedClass} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
