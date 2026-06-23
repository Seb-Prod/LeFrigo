import {
  MdDashboard,
  MdCalendarMonth,
  MdSettings,
  MdMenuBook,
} from "react-icons/md";
import { IconType } from "react-icons";

/* ── Types ──────────────────────────────────────────────────── */

export type NavItem = {
  label: string;
  href: string;
  icon: IconType;
};

/* ── Entrées de navigation principale ───────────────────────── */

export const NAVIGATION: NavItem[] = [
  { label: "Accueil",     href: "/dashboard", icon: MdDashboard    },
  { label: "Recettes",    href: "/recipes",   icon: MdMenuBook     },
  { label: "Planning",    href: "/planning",  icon: MdCalendarMonth },
  { label: "Paramètres",  href: "/settings",  icon: MdSettings     },
];

/* ── Utilitaires ────────────────────────────────────────────── */

/**
 * Vérifie si `pathname` correspond à `href` ou à l'un de ses enfants.
 * Ex : `/recipes/42` est actif pour `href="/recipes"`.
 */
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Retourne l'entrée de navigation active pour `pathname`,
 * ou `null` si aucune ne correspond.
 */
export function getCurrentPage(pathname: string): NavItem | null {
  return NAVIGATION.find((item) => isActivePath(pathname, item.href)) ?? null;
}