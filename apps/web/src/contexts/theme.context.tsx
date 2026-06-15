"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* ── Types ── */

type Theme         = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

/* ── Constantes ── */

const STORAGE_KEY      = "lefrigo-theme";
const DEFAULT_THEME: Theme = "system";

/* ── Helpers client-only ── */

function prefersDark(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveTheme(t: Theme): ResolvedTheme {
  if (t !== "system") return t;
  return prefersDark() ? "dark" : "light";
}

function applyClass(t: Theme): void {
  if (typeof window === "undefined") return;
  document.documentElement.classList.toggle("dark", resolveTheme(t) === "dark");
}

/** Lit le thème stocké — appelé une seule fois à l'init. */
function getStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? DEFAULT_THEME;
}

/* ── Context ── */

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ── Provider ── */

/**
 * Gère le thème de l'application (light / dark / system).
 *
 * - Initialise depuis localStorage via une fonction lazy (pas d'effet)
 * - Résout `system` via `prefers-color-scheme`
 * - Applique la classe `.dark` sur `<html>`
 * - Écoute les changements de préférence OS en temps réel
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  /** Initialisation lazy — évite le setState dans un effet. */
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = getStoredTheme();
    applyClass(stored);
    return stored;
  });

  /** Écoute les changements OS uniquement pour le mode system. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyClass("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  /** Change le thème, persiste et applique la classe. */
  function setTheme(t: Theme): void {
    localStorage.setItem(STORAGE_KEY, t);
    applyClass(t);
    setThemeState(t);
  }

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme: resolveTheme(theme), setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* ── Hook ── */

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  return ctx;
}