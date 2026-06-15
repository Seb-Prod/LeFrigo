"use client";

import clsx from "clsx";
import { MdOutlineWbSunny, MdOutlineNightlight, MdOutlineSettingsSuggest } from "react-icons/md";
import styles from "./ThemeSelector.module.css";

/* ── Types ── */

type Theme = "light" | "dark" | "system";

type ThemeOption = {
  value: Theme;
  label: string;
  icon: React.ReactNode;
};

/* ── Config ── */

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light",  label: "Clair",   icon: <MdOutlineWbSunny /> },
  { value: "system", label: "Système", icon: <MdOutlineSettingsSuggest /> },
  { value: "dark",   label: "Sombre",  icon: <MdOutlineNightlight /> },
];

/* ── Composant ── */

/**
 * Sélecteur de thème à 3 options : clair, système, sombre.
 *
 * Visuels clés :
 * - Option active : fond primary soft + bordure primary + texte teinté
 * - Options inactives : fond neutral, pas de bordure
 *
 * TODO: brancher sur ThemeContext quand il sera créé.
 */
export function ThemeSelector() {
  /** TODO: remplacer par useTheme() */
  const activeTheme: Theme = "system";

  return (
    <div className={styles.wrapper}>
      {THEME_OPTIONS.map(({ value, label, icon }) => (
        <button
          key={value}
          className={clsx(styles.option, value === activeTheme && styles.active)}
          /** TODO: onClick={() => setTheme(value)} */
        >
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
}