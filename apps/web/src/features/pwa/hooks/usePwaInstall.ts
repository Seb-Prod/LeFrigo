import { useDevice } from "@/contexts/device.context";
import { useState } from "react";

/* ── Types ────────────────────────────────────────────────── */

/** OS détecté sur l'appareil de l'utilisateur. */
export type Os = "ios" | "android" | "other";

/* ── Hook ─────────────────────────────────────────────────── */

/**
 * Indique si la modale d'invitation à installer la PWA doit être affichée.
 *
 * - Visible uniquement sur mobile (iOS ou Android), hors mode standalone
 * - Masquée définitivement dans la session si l'utilisateur l'a fermée
 * - Expose `os` pour adapter les instructions à la plateforme détectée
 */
export function usePwaInstall() {
  const { isMobile, isIOS, isAndroid, isPWA } = useDevice();

  const [showPrompt, setShowPrompt] = useState(() => {
    if (typeof window === "undefined") return false;
    const dismissed = sessionStorage.getItem("pwa-prompt-dismissed");
    return isMobile && !isPWA && !dismissed;
  });

  const os: Os = isIOS ? "ios" : isAndroid ? "android" : "other";

  /** Ferme la modale et la supprime pour le reste de la session. */
  function dismiss() {
    sessionStorage.setItem("pwa-prompt-dismissed", "1");
    setShowPrompt(false);
  }

  return { os, showPrompt, dismiss };
}