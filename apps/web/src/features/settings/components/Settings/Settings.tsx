import {
  Button,
  Heading,
  MenuGroup,
  MenuItem,
  MenuItemIcon,
  Surface,
} from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { AuthForm } from "@/features/auth";
import { useState } from "react";
import { ProfileCard } from "../ProfileCard";
import { GuestCard } from "../GuestCard";
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
import { useDevice } from "@/contexts/device.context";

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
  const { device } = useDevice();

  return (
    <>
      <Surface>
        {/* ── Titre ── */}
        {device === "mobile" && (
          <Heading align="center">Réglages</Heading>
        )}
        {/* ── Profil ── */}
        {user ? (
          <MenuGroup>
            <ProfileCard user={user} />
          </MenuGroup>
        ) : (
          <GuestCard />
        )}

        {/* ── Appareils ── */}
        <MenuGroup title="mes appreils">
          <MenuItem
            label="Aucun appareil connecté"
            description="Connecte-toi pour voir tes sessions"
            icon={<TbDevicesQuestion />}
            locked
          />
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
          <MenuItem label="ThemeSelector à venir" locked />
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
      </Surface>
    </>
  );
}
