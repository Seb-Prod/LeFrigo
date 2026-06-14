import {
  MdOutlineDesktopWindows,
  MdOutlineDevices,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import { SiBrave, SiFirefox, SiGooglechrome, SiSafari } from "react-icons/si";

/**
 * Extrait le navigateur depuis le user-agent.
 * Retourne le nom et l'icône correspondante.
 */
export function parseBrowser(ua: string): {
  name: string;
  icon: React.ReactNode;
} {
  if (/Chrome/i.test(ua) && !/Chromium|Edg/i.test(ua))
    return { name: "Chrome", icon: <SiGooglechrome size={18} /> };
  if (/Firefox/i.test(ua))
    return { name: "Firefox", icon: <SiFirefox size={18} /> };
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua))
    return { name: "Safari", icon: <SiSafari size={18} /> };
  if (/Brave/i.test(ua)) return { name: "Brave", icon: <SiBrave size={18} /> };
  return { name: "Navigateur inconnu", icon: <MdOutlineDevices size={18} /> };
}

/**
 * Retourne l'icône du type d'appareil (mobile ou desktop)
 * en se basant sur le user-agent.
 */
export function parseDevice(ua: string): React.ReactNode {
  if (/Mobile/i.test(ua)) return <MdOutlinePhoneAndroid/>;
  return <MdOutlineDesktopWindows />;
}

/** Supprime le préfixe IPv6 `::ffff:` d'une adresse IP. */
export function cleanIp(ip: string): string {
  return ip.replace("::ffff:", "");
}

/** Formate la date de dernière activité en durée relative (ex: "Il y a 5 min"). */
export function formatLastActivity(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 60) return `Il y a ${diffMin} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  return `Il y a ${diffDays}j`;
}

/** Formate le temps restant avant expiration de la session (ex: "Expire dans 2h"). */
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
