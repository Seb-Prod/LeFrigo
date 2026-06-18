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
import { IconType } from "react-icons";
import { TbDevicesQuestion } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

type ConfirmationModalConfig = {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

type PageConfig = {
  path: string;
  title: string;
  icon: IconType;
  showBackButton?: boolean;
  confirmationModal?: ConfirmationModalConfig;
};

export const PAGE_CONFIG: PageConfig[] = [
  {
    path: "/recipes/create",
    title: "Partager une recette",
    icon: MdOutlineAlternateEmail,
    showBackButton: true,
    confirmationModal: {
      title: "Quitter la création de recette ?",
      description: "Les modifications non enregistrées seront perdues.",
      confirmLabel: "Quitter",
      cancelLabel: "Continuer",
    },
  },
  {
    path: "/forgot-password",
    title: "Mot de passe oublié",
    icon: MdOutlineAlternateEmail,
    showBackButton: true,
  },
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
    title: "Profile",
    icon: MdPerson,
    showBackButton: true,
  },
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
  {
    path: "/recipes",
    title: "Recettes",
    icon: MdRestaurant,
    showBackButton: false,
  },
  {
    path: "/planning",
    title: "Planning",
    icon: MdCalendarMonth,
    showBackButton: false,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: MdDashboard,
    showBackButton: false,
  },
];

export const NAVIGATION = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: MdDashboard,
  },

  {
    label: "Recettes",
    href: "/recipe",
    icon: MdMenuBook,
  },

  {
    label: "Planning",
    href: "/planning",
    icon: MdCalendarMonth,
  },

  {
    label: "Paramètres",
    href: "/settings",
    icon: MdSettings,
  },
];

const DEFAULT_PAGE_CONFIG: PageConfig = {
  path: "",
  title: "LeFrigo",
  icon: MdDashboard,
  showBackButton: false,
  confirmationModal: undefined,
};

export function getPageConfig(pathname: string) {
  return (
    PAGE_CONFIG.find(({ path }) => pathname.startsWith(path)) ?? {
      ...DEFAULT_PAGE_CONFIG
    }
  );
}

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getCurrentPage(pathname: string) {
  return NAVIGATION.find((item) => isActivePath(pathname, item.href)) ?? null;
}
