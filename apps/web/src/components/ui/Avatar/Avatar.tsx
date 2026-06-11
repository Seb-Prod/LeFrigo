import { FiUser } from "react-icons/fi";
import clsx from "clsx";
import styles from "./Avatar.module.css";

/* ── Types ── */

type AvatarSize = "sm" | "md" | "lg";

type Props = {
  /** Nom d'utilisateur — affiche les initiales si fourni, icône sinon. */
  username?: string;
  size?: AvatarSize;
  className?: string;
};

/* ── Helpers ── */

/**
 * Extrait les initiales depuis un nom d'utilisateur.
 * "Sophie Bernard" → "SB", "sophie" → "SO"
 */
function getInitials(username: string): string {
  const parts = username.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return username.slice(0, 2).toUpperCase();
}

/* ── Composant ── */

/**
 * Avatar circulaire avec deux états : initiales (connecté) ou icône (invité).
 *
 * Visuels clés :
 * - Avec `username` : fond primary, initiales extraites du nom
 * - Sans `username` : fond neutral, icône FiUser
 */
export function Avatar({ username, size = "md", className }: Props) {
  return (
    <div
      className={clsx(
        styles.avatar,
        styles[size],
        !username && styles.neutral,
        className,
      )}
      aria-label={username ? `Avatar de ${username}` : "Utilisateur non connecté"}
    >
      {/* ── Initiales ou icône fallback ── */}
      {username ? getInitials(username) : <FiUser aria-hidden="true" />}
    </div>
  );
}