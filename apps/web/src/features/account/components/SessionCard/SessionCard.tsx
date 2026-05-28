import { Badge, Button } from "@/components/ui";
import { UserSession } from "@lefrigo/shared";
import { FiClock, FiMapPin, FiCalendar } from "react-icons/fi";
import { SiBrave, SiFirefox, SiGooglechrome, SiSafari } from "react-icons/si";
import {
  MdOutlineDevices,
  MdOutlineDesktopWindows,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import styles from "./SessionCard.module.css";

type Props = {
  session: UserSession;
  isCurrent?: boolean;
  onRevoke?: () => void;
};

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

function parseDevice(ua: string): React.ReactNode {
  if (/Mobile/i.test(ua)) return <MdOutlinePhoneAndroid size={14} />;
  return <MdOutlineDesktopWindows size={14} />;
}

function cleanIp(ip: string): string {
  return ip.replace("::ffff:", "");
}

export function SessionCard({ session, isCurrent = false, onRevoke }: Props) {
  const ua = session.userAgent ?? "";
  const browser = parseBrowser(ua);

  

  return (
    <div className={`${styles.card} ${isCurrent ? styles.current : ""}`}>
      <div className={styles.header}>
        <span className={styles.browserIcon}>{browser.icon}</span>

        <div className={styles.info}>
          <span className={styles.browserName}>{browser.name}</span>
          <span className={styles.device}>{parseDevice(ua)}</span>
        </div>

        <div className={styles.badges}>
          {isCurrent && <Badge variant="success">Session actuelle</Badge>}
          <Badge variant={session.rememberMe ? "info" : "default"}>
            {session.rememberMe ? "Remember me" : "Session courte"}
          </Badge>
          {!isCurrent && (
            <button className={styles.logoutButton} onClick={onRevoke}>
              Déconnecter
            </button>
          )}
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <FiMapPin size={13} />
          {cleanIp(session.ip ? session.ip : "")}
        </span>
        <span className={styles.metaItem}>
          <FiClock size={13} />
          {new Date(session.lastActivityAt).toLocaleString("fr-FR")}
        </span>
        <span className={styles.metaItem}>
          <FiCalendar size={13} />
          Expire le {new Date(session.expiresAt).toLocaleDateString("fr-FR")}
        </span>
      </div>
    </div>
  );
}
