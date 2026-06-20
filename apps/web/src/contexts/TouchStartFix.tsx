"use client";

import { useEffect } from "react";

/**
 * Fix Safari/iOS — force la reconnaissance de :active sur les éléments tactiles.
 * Un listener `touchstart` vide suffit à débloquer le comportement natif.
 */
export function TouchStartFix() {
  useEffect(() => {
    document.addEventListener("touchstart", () => {}, { passive: true });
  }, []);

  return null;
}