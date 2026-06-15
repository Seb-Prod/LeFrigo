"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  MdOutlineWbSunny,
  MdOutlineNightlight,
  MdOutlineSettingsSuggest,
} from "react-icons/md";
import { useTheme } from "@/contexts/theme.context";
import styles from "./ThemeSelector.module.css";
import { useMounted } from "../../hooks/useMounted";

/* ── Types ── */

type Theme = "light" | "dark" | "system";

type ThemeOption = {
  value: Theme;
  label: string;
  icon: React.ReactNode;
};

/* ── Config ── */

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Clair", icon: <MdOutlineWbSunny /> },
  { value: "system", label: "Système", icon: <MdOutlineSettingsSuggest /> },
  { value: "dark", label: "Sombre", icon: <MdOutlineNightlight /> },
];

/* ── Composant ── */

/**
 * Sélecteur de thème à 3 options : clair, système, sombre.
 *
 * Visuels clés :
 * - Option active : fond primary soft + bordure primary + texte teinté
 * - Options inactives : fond neutral, pas de bordure
 *
 * Supprime l'état actif pendant le SSR (mounted guard) pour éviter
 * le hydration mismatch avec localStorage.
 */
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <div className={styles.wrapper}>
      {THEME_OPTIONS.map(({ value, label, icon }) => {
        const isActive = mounted && value === theme;
        return (
          <button
            key={value}
            className={clsx(styles.option, isActive && styles.active)}
            onClick={() => setTheme(value)}
            aria-pressed={isActive}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
