// features/settings/Profile/Profile.tsx

import { Badge, MenuGroup, MenuItem, MenuItemIcon } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { ProfileHero } from "./components/ProfileHero";
import {
  MdModeEditOutline,
  MdOutlineAlternateEmail,
  MdOutlinePerson,
  MdOutlineLock,
  MdOutlineCalendarToday,
  MdOutlineVerifiedUser,
} from "react-icons/md";

/** Config visuelle par statut de compte. */
const STATUS_CONFIG = {
  PENDING: { color: "warning" as const, label: "En attente" },
  ACTIVE: { color: "success" as const, label: "Actif" },
  SUSPENDED: { color: "warning" as const, label: "Suspendu" },
  BANNED: { color: "danger" as const, label: "Banni" },
};

/** Icône "éditer" affichée à droite des champs modifiables. */
const EDIT_ICON = (
  <MenuItemIcon size="md">
    <MdModeEditOutline />
  </MenuItemIcon>
);

/**
 * Page de profil : détails du compte connecté.
 *
 * Sections :
 * - ProfileHero  : avatar, nom, badges rôle/email
 * - Informations : champs modifiables (email, username, mot de passe)
 * - À propos     : données en lecture seule (date d'inscription, statut)
 *
 * TODO: brancher les onClick sur les modales d'édition (email, username, password).
 * TODO: formater `createdAt` (actuellement en dur).
 */
export function Profile() {
  const { user } = useAuth();

  return (
    <>
      <ProfileHero />

      {/* ── Informations modifiables ── */}
      <MenuGroup title="Informations">
        <MenuItem
          label="Email"
          description={user?.email}
          icon={
            <MenuItemIcon color="info" size="md">
              <MdOutlineAlternateEmail />
            </MenuItemIcon>
          }
          right={EDIT_ICON}
        />
        <MenuItem
          label="Nom d'utilisateur"
          description={user?.userName}
          icon={
            <MenuItemIcon color="primary" size="md">
              <MdOutlinePerson />
            </MenuItemIcon>
          }
          right={EDIT_ICON}
        />
        <MenuItem
          label="Mot de passe"
          description="Changer de mot de passe"
          icon={
            <MenuItemIcon color="warning" size="md">
              <MdOutlineLock />
            </MenuItemIcon>
          }
          right={EDIT_ICON}
        />
      </MenuGroup>

      {/* ── Informations en lecture seule ── */}
      <MenuGroup title="À propos">
        <MenuItem
          label="Membre depuis"
          icon={
            <MenuItemIcon color="neutral" size="md">
              <MdOutlineCalendarToday />
            </MenuItemIcon>
          }
          right="12 mars 2025" // TODO: formater user.createdAt
          hideChevron
        />
        <MenuItem
          label="Statut du compte"
          icon={
            <MenuItemIcon color="neutral" size="md">
              <MdOutlineVerifiedUser />
            </MenuItemIcon>
          }
          right={
            <Badge
              color={
                STATUS_CONFIG[user?.status as keyof typeof STATUS_CONFIG]
                  ?.color ?? "default"
              }
            >
              {STATUS_CONFIG[user?.status as keyof typeof STATUS_CONFIG]
                ?.label ?? user?.status}
            </Badge>
          }
          hideChevron
        />
      </MenuGroup>
    </>
  );
}
