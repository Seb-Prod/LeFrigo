import {
  MdDashboard,
  MdRestaurant,
  MdCalendarMonth,
  MdSettings,
  MdPerson,
  MdOutlineAlternateEmail,
  MdOutlineLock,
  MdMenuBook,
} from "react-icons/md";
import { TbDevicesQuestion } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IconType } from "react-icons";

/* ── Types ──────────────────────────────────────────────────── */

export type ConfirmationModalConfig = {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export type PageConfig = {
  path: string;
  title: string;
  icon: IconType;
  showBackButton?: boolean;
  confirmationModal?: ConfirmationModalConfig;
};

/* ── Configuration des pages ────────────────────────────────── */

/**
 * Ordre : du chemin le plus long au plus court.
 * `getPageConfig` fait un `startsWith` — les routes enfants
 * doivent apparaître avant leurs parents pour matcher correctement.
 */
export const PAGE_CONFIG: PageConfig[] = [
  /* ── Recettes ── */
  {
    path: "/recipes/create",
    title: "Partager une recette",
    icon: MdRestaurant,
    showBackButton: true,
    confirmationModal: {
      title: "Quitter la création de recette ?",
      description: "Les modifications non enregistrées seront perdues.",
      confirmLabel: "Quitter",
      cancelLabel: "Continuer",
    },
  },
  {
    path: "/recipes/",
    title: "Recette",
    icon: MdRestaurant,
    showBackButton: true,
  },
  {
    path: "/recipes",
    title: "Recettes",
    icon: MdRestaurant,
    showBackButton: false,
  },

  /* ── Paramètres — profil ── */
  {
    path: "/settings/profile/change-email",
    title: "Changer l'e-mail",
    icon: MdOutlineAlternateEmail,
    showBackButton: true,
  },
  {
    path: "/settings/profile/change-username",
    title: "Changer de nom d'utilisateur",
    icon: FaUser,
    showBackButton: true,
  },
  {
    path: "/settings/profile/change-password",
    title: "Changer le mot de passe",
    icon: MdOutlineLock,
    showBackButton: true,
  },
  {
    path: "/settings/profile",
    title: "Profil",
    icon: MdPerson,
    showBackButton: true,
  },

  /* ── Paramètres ── */
  {
    path: "/settings/sessions",
    title: "Sessions",
    icon: TbDevicesQuestion,
    showBackButton: true,
  },
  {
    path: "/settings",
    title: "Paramètres",
    icon: MdSettings,
    showBackButton: false,
  },

  /* ── Autres ── */
  {
    path: "/forgot-password",
    title: "Mot de passe oublié",
    icon: MdOutlineAlternateEmail,
    showBackButton: true,
  },
  {
    path: "/planning",
    title: "Planning",
    icon: MdCalendarMonth,
    showBackButton: false,
  },
  {
    path: "/dashboard",
    title: "Accueil",
    icon: MdDashboard,
    showBackButton: false,
  },
];

/* ── Fallback ───────────────────────────────────────────────── */

const DEFAULT_PAGE_CONFIG: PageConfig = {
  path: "",
  title: "LeFrigo",
  icon: MdDashboard,
  showBackButton: false,
};

/* ── Utilitaires ────────────────────────────────────────────── */

/**
 * Retourne la config de la page correspondant à `pathname`.
 *
 * Stratégie : `startsWith` sur chaque path, le plus long en premier
 * pour que `/recipes/create` matche avant `/recipes`.
 * Le tableau étant déjà trié par longueur décroissante, aucun `.sort`
 * à l'exécution n'est nécessaire.
 */
export function getPageConfig(pathname: string): PageConfig {
  return (
    PAGE_CONFIG.find(({ path }) => pathname.startsWith(path)) ??
    DEFAULT_PAGE_CONFIG
  );
}