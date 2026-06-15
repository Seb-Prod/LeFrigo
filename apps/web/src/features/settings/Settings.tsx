import {
  Badge,
  MenuGroup,
  MenuItem,
  MenuItemIcon,
} from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { useEffect, useState } from "react";
import { ProfileCard } from "./components/ProfileCard";
import { GuestCard } from "./components/GuestCard";
import { TbDevicesQuestion } from "react-icons/tb";
import {
  FiBook,
  FiList,
  FiLogOut,
  FiMail,
  FiSettings,
  FiShare2,
  FiUsers,
} from "react-icons/fi";
import { UserSession } from "@lefrigo/shared";
import { authService } from "../auth/services/auth.service";
import { authStorage } from "@/lib/auth";
import { SessionCard } from "./components/SessionCard";
import { ThemeSelector } from "./components/ThemeSelector";

/**
 * Page de réglages.
 *
 * Sections :
 * - Profil (connecté) ou invitation à se connecter (invité)
 * - Appareils, Foyer, Recettes — verrouillés si non connecté
 * - Apparence — toujours accessible
 * - Compte (déconnexion) — visible uniquement si connecté
 */
export function Settings() {
  const { user, logout } = useAuth();

  const [sessions, setSessions] = useState<UserSession[]>([]);

  useEffect(() => {
    if (!user) return;
    authService.getSessions().then(setSessions);
  }, [user]);

  // ── Calculs nullsafe (pas de guard brutal) ──────────────────
  const currentIdentifier = user ? authStorage.getSessionIdentifier() : null;
  const currentSession = sessions.find(
    (s) => s.sessionIdentifier === currentIdentifier,
  );
  const otherSessions = sessions.filter(
    (s) => s.sessionIdentifier !== currentIdentifier,
  );

  return (
    <>
      {/* ── Profil ── */}
      {user ? (
        <MenuGroup>
          <ProfileCard user={user} />
        </MenuGroup>
      ) : (
        <GuestCard />
      )}

      {/* ── Appareils ── */}
      <MenuGroup title="mes appareils">
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
        {otherSessions.length > 0 && currentSession && (
          <MenuItem
            label="Autres appareils"
            description="Sessions actives sur d'autres appareils"
            icon={
              <MenuItemIcon color="danger">
                <TbDevicesQuestion />
              </MenuItemIcon>
            }
            href="/settings/sessions"
            right={<Badge color="danger">{otherSessions.length}</Badge>}
            hideChevron
          />
        )}
      </MenuGroup>

      {/* ── Foyer ── */}
      <MenuGroup title="foyer">
        <MenuItem
          label="Membres"
          icon={
            <MenuItemIcon color="primary">
              <FiUsers />
            </MenuItemIcon>
          }
          locked={!user}
        />
        <MenuItem
          label="Inviter quelqu'un"
          icon={
            <MenuItemIcon color="info">
              <FiMail />
            </MenuItemIcon>
          }
          locked={!user}
        />
        <MenuItem
          label="Gérer le foyer"
          icon={
            <MenuItemIcon color="warning">
              <FiSettings />
            </MenuItemIcon>
          }
          locked={!user}
        />
      </MenuGroup>

      {/* ── Recettes ── */}
      <MenuGroup title="recette">
        <MenuItem
          label="Partager une recette"
          icon={
            <MenuItemIcon color="accent">
              <FiShare2 />
            </MenuItemIcon>
          }
          locked={!user}
        />
        <MenuItem
          label="Mes recettes partagées"
          icon={
            <MenuItemIcon color="primary">
              <FiBook />
            </MenuItemIcon>
          }
          locked={!user}
        />
        <MenuItem
          label="Ma liste de recettes"
          icon={
            <MenuItemIcon color="success">
              <FiList />
            </MenuItemIcon>
          }
          locked={!user}
        />
      </MenuGroup>

      {/* ── Apparence ── */}
      <MenuGroup title="Apparence">
        <ThemeSelector />
      </MenuGroup>

      {/* ── Compte ── */}
      {user && (
        <MenuGroup title="Compte">
          <MenuItem
            label="Se déconnecter"
            icon={
              <MenuItemIcon color="danger">
                <FiLogOut />
              </MenuItemIcon>
            }
            onClick={logout}
            hideChevron
          />
        </MenuGroup>
      )}
    </>
  );
}
