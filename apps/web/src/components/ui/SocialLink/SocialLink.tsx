"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { IoLogoGithub, IoLogoLinkedin, IoLogoYoutube } from "react-icons/io";
import styles from "./SocialLink.module.css";

/* ── Types ───────────────────────────────────────────────── */

type Socials = "gitHub" | "linkedin" | "youtube";

type Props = {
  social?: Socials;
};

/* ── Configuration des réseaux sociaux ──────────────────── */

const SOCIAL_MAP: Record<
  Socials,
  {
    href: string;
    label: string;
    icon: ReactNode;
    color: string;
  }
> = {
  gitHub: {
    href: "https://github.com/Seb-Prod",
    label: "GitHub",
    icon: <IoLogoGithub size={28} />,
    color: "#181717",
  },

  linkedin: {
    href: "https://www.linkedin.com/in/sébastien-drillaud-b68b3318a/",
    label: "LinkedIn",
    icon: <IoLogoLinkedin size={28} />,
    color: "#0A66C2",
  },

  youtube: {
    href: "https://www.youtube.com/@sebastiendrillaud4379",
    label: "YouTube",
    icon: <IoLogoYoutube size={28} />,
    color: "#FF0000",

  },
};

/* ── Composant ──────────────────────────────────────────── */

/**
 * Bouton de lien vers un réseau social.
 *
 * Au repos, seule l'icône est affichée.
 * Au survol, le bouton s'étend et affiche le libellé.
 */
export function SocialLink({
  social = "gitHub",
}: Props) {
  const { href, label, icon, color } = SOCIAL_MAP[social];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
      style={
        {
          "--social-color": color,
        } as React.CSSProperties
      }
    >
      {/* ── Icône ─────────────────────────────────────────── */}
      <span className={styles.icon}>
        {icon}
      </span>

      {/* ── Libellé ───────────────────────────────────────── */}
      <span className={styles.label}>
        {label}
      </span>
    </Link>
  );
}