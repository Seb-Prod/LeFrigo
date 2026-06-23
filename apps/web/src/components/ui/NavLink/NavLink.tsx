"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/navigation";
import styles from "./NavLink.module.css";

type Props = {
  href: string;
  label: string;
};

/** Représente une vague de clic positionnée au point de contact */
type Ripple = {
  id: number;
  x: number;
  y: number;
};

/**
 * NavLink
 * Lien de navigation avec un fond "blob" organique :
 * - Hover : le blob apparaît et ondule doucement derrière le texte
 * - Active : le blob reste visible en permanence, légèrement animé
 * - Click : une onde (ripple) se propage depuis le point de contact
 * Utilisé par Topbar et Sidebar.
 */
export function NavLink({ href, label }: Props) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  const [ripples, setRipples] = useState<Ripple[]>([]);
  /** Compteur pour générer des clés uniques de ripple */
  const rippleId = useRef(0);

  /** Déclenche une onde organique au point de clic, auto-nettoyée après l'animation */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = rippleId.current++;

    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);

    // Nettoyage après la durée de l'animation (600ms)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(styles.link, active && styles.active)}
    >
      {/* ── Blob organique de fond ── */}
      <span className={styles.blob} aria-hidden="true" />

      {/* ── Ondes de clic ── */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className={styles.ripple}
          aria-hidden="true"
          style={{ left: r.x, top: r.y }}
        />
      ))}

      <span className={styles.label}>{label}</span>
    </Link>
  );
}