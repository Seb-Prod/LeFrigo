// features/settings/Profile/Profile.tsx

import { Badge, MenuGroup, MenuItem, MenuItemIcon } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { ProfileHero } from "../../components/ProfileHero";
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
  PENDING:   { color: "warning" as const, label: "En attente" },
  ACTIVE:    { color: "success" as const, label: "Actif" },
  SUSPENDED: { color: "warning" as const, label: "Suspendu" },
  BANNED:    { color: "danger"  as const, label: "Banni" },
};

/** Icône "éditer" affichée à droite des champs modifiables. */
const EDIT_ICON = (
  <MenuItemIcon size="md">
    <MdModeEditOutline />
  </MenuItemIcon>
);

/** Formate une date ISO en "12 mars 2025". */
function formatDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Page de profil : détails du compte connecté.
 *
 * Sections :
 * - ProfileHero  : avatar, nom, badges rôle/email
 * - Informations : champs modifiables (email, username, mot de passe),
 *                   générés depuis `editableFields`
 * - À propos     : données en lecture seule (date d'inscription, statut),
 *                   générées depuis `aboutFields`
 */
export function Profile() {
  const { user } = useAuth();

  const status = STATUS_CONFIG[user?.status as keyof typeof STATUS_CONFIG] ?? {
    color: "default" as const,
    label: user?.status,
  };

  /** Champs modifiables — chacun ouvre sa propre page d'édition. */
  const editableFields = [
    {
      label: "Email",
      description: user?.email,
      href: "/settings/profile/change-email",
      color: "info" as const,
      icon: MdOutlineAlternateEmail,
    },
    {
      label: "Nom d'utilisateur",
      description: user?.userName,
      href: "/settings/profile/change-username",
      color: "primary" as const,
      icon: MdOutlinePerson,
    },
    {
      label: "Mot de passe",
      description: "Changer de mot de passe",
      href: "/settings/profile/change-password",
      color: "warning" as const,
      icon: MdOutlineLock,
    },
  ];

  /** Champs en lecture seule — affichage simple, pas de navigation. */
  const aboutFields = [
    {
      label: "Membre depuis",
      icon: MdOutlineCalendarToday,
      right: formatDate(user?.createdAt),
    },
    {
      label: "Statut du compte",
      icon: MdOutlineVerifiedUser,
      right: <Badge color={status.color}>{status.label}</Badge>,
    },
  ];

  return (
    <>
      <ProfileHero />

      {/* ── Informations modifiables ── */}
      <MenuGroup title="Informations">
        {editableFields.map((field) => {
          const Icon = field.icon;
          return (
            <MenuItem
              key={field.href}
              label={field.label}
              description={field.description}
              href={field.href}
              right={EDIT_ICON}
              icon={<MenuItemIcon color={field.color} size="md"><Icon /></MenuItemIcon>}
            />
          );
        })}
      </MenuGroup>

      {/* ── Informations en lecture seule ── */}
      <MenuGroup title="À propos">
        {aboutFields.map((field) => {
          const Icon = field.icon;
          return (
            <MenuItem
              key={field.label}
              label={field.label}
              icon={<MenuItemIcon color="neutral" size="md"><Icon /></MenuItemIcon>}
              right={field.right}
              hideChevron
            />
          );
        })}
      </MenuGroup>
    </>
  );
}