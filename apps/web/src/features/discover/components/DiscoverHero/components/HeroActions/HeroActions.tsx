"use client";

import { useState } from "react";

import { Button } from "@/components/ui";
import { AuthForm } from "@/features/auth";

import styles from "./HeroActions.module.css";
import { useDevice } from "@/contexts/device.context";
import { InstallPrompt } from "@/features/pwa";

/* ── Types ─────────────────────────────────────────────────── */

/** Modes d'ouverture disponibles pour la modal d'authentification */
type AuthMode = "login" | "register";

/**
 * Actions principales du hero.
 *
 * Permet à l'utilisateur d'ouvrir la modal
 * d'authentification en mode connexion ou inscription.
 *
 * États :
 * - `register` → ouverture de la modal en mode inscription.
 * - `login` → ouverture de la modal en mode connexion.
 *
 * La propriété `key={authMode}` force le remontage de `AuthForm`
 * lors d'un changement de mode afin de réinitialiser son état interne.
 */
export function HeroActions() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  /* ── Gestion des actions ────────────────────────────────── */

  /** Ouvre la modal dans le mode d'authentification demandé */
  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
      {/* ── Boutons d'action ── */}
      <div className={styles.actions}>
        <Button onClick={() => openAuth("register")}>
          Créer un compte
        </Button>

        <Button variant="ghost" onClick={() => openAuth("login")}>
          Se connecter
        </Button>
      </div>

      {/* ── Modal d'authentification ── */}
      <AuthForm
        key={authMode}
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />

      {/* –– Modal d'installation PWA –– */}
      <InstallPrompt/>
    </>
  );
}