import {
  MdOutlineDesktopWindows,
  MdOutlineDevices,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import { SiBrave, SiFirefox, SiGooglechrome, SiSafari } from "react-icons/si";

/* ── Parsing user-agent ───────────────────────────────────── */

/**
 * Extrait le navigateur depuis le user-agent.
 * Retourne le nom, l'icône et le système d'exploitation correspondants.
 */
export function parseBrowser(ua: string): {
  name: string;
  icon: React.ReactNode;
  os: string;
} {
  const os = parseOs(ua);

  if (/Chrome/i.test(ua) && !/Chromium|Edg/i.test(ua))
    return { name: "Chrome", icon: <SiGooglechrome size={18} />, os };
  if (/Firefox/i.test(ua))
    return { name: "Firefox", icon: <SiFirefox size={18} />, os };
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua))
    return { name: "Safari", icon: <SiSafari size={18} />, os };
  if (/Brave/i.test(ua))
    return { name: "Brave", icon: <SiBrave size={18} />, os };
  return { name: "Navigateur inconnu", icon: <MdOutlineDevices size={18} />, os };
}

/** Extrait le nom du système d'exploitation depuis le user-agent. */
export function parseOs(ua: string): string {
  if (/iPhone|iPad/.test(ua)) return "iOS";
  if (/Android/.test(ua)) return "Android";
  if (/Mac OS X/.test(ua) && !/iPhone|iPad/.test(ua)) return "macOS";
  if (/Windows/.test(ua)) return "Windows";
  if (/Linux/.test(ua)) return "Linux";
  return "OS inconnu";
}

/**
 * Retourne l'icône du type d'appareil (mobile ou desktop)
 * en se basant sur le user-agent.
 */
export function parseDevice(ua: string): React.ReactNode {
  if (/Mobile/i.test(ua)) return <MdOutlinePhoneAndroid />;
  return <MdOutlineDesktopWindows />;
}

/* ── Formatage réseau ─────────────────────────────────────── */

/** Supprime le préfixe IPv6 `::ffff:` d'une adresse IP. */
export function cleanIp(ip: string): string {
  return ip.replace("::ffff:", "");
}

/* ── Formatage dates & durées ─────────────────────────────── */

/** Formate une date en jour lisible (ex : "10 juin"). */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

/** Formate la date de dernière activité en durée relative (ex : "Il y a 5 min"). */
export function formatLastActivity(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 60) return `Il y a ${diffMin} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  return `Il y a ${diffDays}j`;
}

/** Formate le temps restant avant expiration de la session (ex : "Expire dans 2h"). */
export function formatSessionExpiry(expiresAt: Date): string {
  const diffMs = expiresAt.getTime() - Date.now();

  if (diffMs <= 0) return "Session expirée";

  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 60) return `Expire dans ${diffMin} min`;
  if (diffHours < 24) return `Expire dans ${diffHours}h`;
  return `Expire dans ${diffDays}j`;
}

/* ── Sémantique visuelle ──────────────────────────────────── */

/**
 * Retourne la couleur sémantique du badge d'expiration
 * selon le temps restant avant la fin de la session.
 *
 * - `danger`  : moins d'1h
 * - `warning` : moins de 24h
 * - `success` : plus de 24h
 */
export function getExpiryColor(
  expiresAt: string,
): "danger" | "warning" | "success" {
  const diffHours =
    (new Date(expiresAt).getTime() - Date.now()) / 1000 / 60 / 60;

  if (diffHours < 1) return "danger";
  if (diffHours < 24) return "warning";
  return "success";
}