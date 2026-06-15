import { Badge, MenuItem, MenuItemIcon, Text } from "@/components/ui";
import {
  cleanIp,
  formatDate,
  formatSessionExpiry,
  formatLastActivity,
  parseBrowser,
  parseDevice,
  getExpiryColor,
} from "@/features/settings/utils/session.utils";
import { UserSession } from "@lefrigo/shared";
import { IoHourglassOutline, IoShield } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";

/**
 * Carte de la session active (cet appareil).
 *
 * Affiche le navigateur, l'OS, l'IP, la date de connexion, la dernière
 * activité et le délai d'expiration avec couleur dynamique.
 * Le badge "Remember me" apparaît uniquement si la session est persistante.
 * Volontairement non cliquable : l'utilisateur sait qu'il s'agit de sa session courante.
 */
export function SessionCard({ session }: { session: UserSession }) {
  const ua = session.userAgent ?? "";
  const browser = parseBrowser(ua);
  const device = parseDevice(ua);
  const ip = cleanIp(session.ip ?? "IP inconnue");
  const lastActivity = formatLastActivity(new Date(session.lastActivityAt));
  const createdAt = formatDate(new Date(session.createdAt));
  const expiry = formatSessionExpiry(new Date(session.expiresAt));
  const expiryColor = getExpiryColor(session.expiresAt);

  return (
    <MenuItem
      label={`${browser.name} · ${browser.os}`}
      icon={<MenuItemIcon color="success">{device}</MenuItemIcon>}
      description={
        <div style={{ display: "flex", gap: 6, flexDirection: "column" }}>
          {/* ── Méta : IP + date de connexion ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Text>{`${ip} · Connecté le ${createdAt}`}</Text>
          </div>

          {/* ── Badges : activité + expiration + remember me ── */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Badge color="neutral">
              <MdAccessTime />
              {lastActivity}
            </Badge>
            <Badge color={expiryColor}>
              <IoHourglassOutline />
              {expiry}
            </Badge>
            {session.rememberMe && (
              <Badge color="warning">
                <IoShield />
                Remember me
              </Badge>
            )}
          </div>
        </div>
      }
      hideChevron
    />
  );
}
