import { MenuGroup, MenuItem, MenuItemIcon } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { authStorage } from "@/lib/auth";
import { UserSession } from "@lefrigo/shared";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { TbDevicesQuestion } from "react-icons/tb";
import { OtherSessionCard, SessionCard } from "../../components";
import { authService } from "@/features/auth";

/**
 * Page de gestion des sessions actives.
 *
 * Sections :
 * - Cet appareil   — session courante identifiée par `sessionIdentifier`
 * - Autres appareils — sessions distantes révocables unitairement
 * - Actions        — révocation globale de toutes les sessions distantes
 *
 * États :
 * - Sans session courante : fallback "Aucun appareil connecté"
 * - Sans autres sessions  : groupe vide (titre affiche "0")
 */
export function Sessions() {
  const { user } = useAuth();

  const [sessions, setSessions] = useState<UserSession[]>([]);

  useEffect(() => {
    if (!user) return;
    authService.getSessions().then(setSessions);
  }, [user]);

  // ── Identification de la session courante ───────────────────
  const currentIdentifier = user ? authStorage.getSessionIdentifier() : null;
  const currentSession = sessions.find(
    (s) => s.sessionIdentifier === currentIdentifier,
  );
  const otherSessions = sessions.filter(
    (s) => s.sessionIdentifier !== currentIdentifier,
  );

  /** Révoque une session distante et la retire de la liste locale. */
  const handleRevoke = (id: string) => {
    authService.revokeSession(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  /** Révoque toutes les sessions distantes sauf la session courante. */
  const handleRevokeAll = async () => {
    await authService.logoutAllDevices(currentIdentifier!);
    setSessions((prev) =>
      prev.filter((s) => s.sessionIdentifier === currentIdentifier),
    );
  };

  return (
    <>
      {/* ── Cet appareil ── */}
      <MenuGroup title="Cet appareil">
        {currentSession ? (
          <SessionCard session={currentSession} />
        ) : (
          <MenuItem
            label="Aucun appareil connecté"
            description="Connecte-toi pour voir tes sessions"
            icon={<TbDevicesQuestion />}
            locked
          />
        )}
      </MenuGroup>

      {/* ── Autres appareils ── */}
      <MenuGroup title={`Autres appareils (${otherSessions.length})`}>
        {otherSessions.map((session) => (
          <OtherSessionCard
            key={session.id}
            session={session}
            onRevoke={handleRevoke}
          />
        ))}
      </MenuGroup>

      {/* ── Actions globales ── */}
      <MenuGroup title="Actions">
        <MenuItem
          label="Révoquer toutes les autres sessions"
          icon={
            <MenuItemIcon color="danger">
              <FiLogOut />
            </MenuItemIcon>
          }
          onClick={handleRevokeAll}
          hideChevron
        />
      </MenuGroup>
    </>
  );
}