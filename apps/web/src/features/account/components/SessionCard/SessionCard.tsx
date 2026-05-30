import { Badge, Card, Text } from "@/components/ui";
import { UserSession } from "@lefrigo/shared";
import { FiClock, FiMapPin, FiCalendar } from "react-icons/fi";
import { SiBrave, SiFirefox, SiGooglechrome, SiSafari } from "react-icons/si";
import {
  MdOutlineDevices,
  MdOutlineDesktopWindows,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import { LogoutButton } from "../../../auth/components/LogoutButton/LogoutButton";
import styles from "./SessionCard.module.css";

type Props = {
  session: UserSession;
  isCurrent?: boolean;
  onRevoke?: () => void;
};

/**
 * Extrait le navigateur depuis le user-agent.
 * Retourne le nom et l'icône correspondante.
 */
function parseBrowser(ua: string): { name: string; icon: React.ReactNode } {
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
function parseDevice(ua: string): React.ReactNode {
  if (/Mobile/i.test(ua)) return <MdOutlinePhoneAndroid size={14} />;
  return <MdOutlineDesktopWindows size={14} />;
}

/** Supprime le préfixe IPv6 `::ffff:` d'une adresse IP. */
function cleanIp(ip: string): string {
  return ip.replace("::ffff:", "");
}

/** Formate la date de dernière activité en durée relative (ex: "Il y a 5 min"). */
function formatLastActivity(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 60) return `Il y a ${diffMin} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  return `Il y a ${diffDays}j`;
}

/**
 * Affiche les informations d'une session utilisateur.
 * La session courante est mise en avant visuellement avec un dot vert.
 * Un bouton de révocation est affiché pour les sessions non courantes.
 */
export function SessionCard({ session, isCurrent = false, onRevoke }: Props) {
  const ua = session.userAgent ?? "";
  const browser = parseBrowser(ua);

  return (
    <Card variant={isCurrent ? "primary" : "default"}>
      <div className={styles.header}>
        <div className={styles.browserInfo}>
          {isCurrent && <span className={styles.activeDot} aria-hidden="true" />}
          {browser.icon}
          {parseDevice(ua)}
          <Text size="lg">{browser.name}</Text>
          <Text variant="muted">
            {formatLastActivity(new Date(session.lastActivityAt))}
          </Text>
        </div>
        <Badge className={styles.badge} variant={session.rememberMe ? "info" : "default"}>
          {session.rememberMe ? "Remember me" : "Session courte"}
        </Badge>
      </div>

      <div className={styles.footer}>
        <div className={styles.meta}>
          <Text size="sm">
            <FiMapPin /> {cleanIp(session.ip ?? "")}
          </Text>
          <Text size="sm">
            <FiClock />{" "}
            {new Date(session.lastActivityAt).toLocaleString("fr-FR")}
          </Text>
          <Text size="sm">
            <FiCalendar /> Expire le{" "}
            {new Date(session.expiresAt).toLocaleDateString("fr-FR")}
          </Text>
          <Text size="sm" variant="muted">
            {session.sessionIdentifier}
          </Text>
        </div>

        {!isCurrent && onRevoke && (
          <LogoutButton onClick={onRevoke} size="sm">
            Déconnecter
          </LogoutButton>
        )}
      </div>
    </Card>
  );
}