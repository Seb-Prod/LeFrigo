import { MenuItem, MenuItemIcon } from "@/components/ui";
import { formatSessionExpiry, parseBrowser, parseDevice } from "@/features/account/utils/session.utils";
import { UserSession } from "@lefrigo/shared";

/**
 * Carte de la session active (cet appareil).
 *
 * Affiche le navigateur, l'heure de dernière activité et le délai d'expiration.
 * Volontairement épurée : l'utilisateur sait qu'il s'agit de sa session courante.
 */
export function SessionCard({ session }: { session: UserSession }) {
  const ua = session.userAgent ?? "";
  const browser = parseBrowser(ua);
  const device = parseDevice(ua);
  const lastActivity = new Date(session.lastActivityAt)
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const expiry = formatSessionExpiry(new Date(session.expiresAt));

  return (
    <MenuItem
      label={`${browser.name} — cet appareil`}
      description={`Actif à ${lastActivity} · ${expiry}`}
      icon={<MenuItemIcon color="success">{device}</MenuItemIcon>}
      hideChevron
    />
  );
}