"use client";

import { Badge, Button, MenuItem, MenuItemIcon, Text } from "@/components/ui";
import {
  cleanIp,
  formatDate,
  formatLastActivity,
  formatSessionExpiry,
  getExpiryColor,
  parseBrowser,
  parseDevice,
} from "@/features/settings/utils/session.utils";
import { UserSession } from "@lefrigo/shared";
import { FaCrown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoHourglassOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";

/**
 * Carte d'une session ouverte sur un autre appareil.
 *
 * Affiche le navigateur, l'OS, l'IP, la date de connexion, la dernière
 * activité et le délai d'expiration avec couleur dynamique.
 * Le badge "Remember me" apparaît uniquement si la session est persistante.
 * Permet la révocation via `onRevoke`.
 *
 * @param session  - Données de la session distante
 * @param onRevoke - Callback appelé avec l'id de la session à révoquer
 */
export function OtherSessionCard({
  session,
  onRevoke,
}: {
  session: UserSession;
  onRevoke: (id: string) => void;
}) {
  const ua = session.userAgent ?? "";
  const browser = parseBrowser(ua);
  const device = parseDevice(ua);
  const ip = cleanIp(session.ip ?? "IP inconnue");
  const lastActivity = formatLastActivity(new Date(session.lastActivityAt));
  const createdAt = formatDate(new Date(session.createdAt));
  const expiry = formatSessionExpiry(new Date(session.expiresAt));
  const expiryColor = getExpiryColor(session.expiresAt);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <MenuItem
        label={`${browser.name} · ${browser.os}`}
        icon={<MenuItemIcon color="info">{device}</MenuItemIcon>}
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
                  <FaCrown />
                  Remember me
                </Badge>
              )}
            </div>
          </div>
        }
        hideChevron
      />
      <Button
        size="sm"
        color="danger"
        variant="solid"
        onClick={() => onRevoke(session.id)}
        animate={false}
        style={{ flexShrink: 0, marginRight: 12 }}
      >
        <FiLogOut />
      </Button>
    </div>
  );
}
