"use client";

import { useState } from "react";
import { Avatar, Button, Heading, Text } from "@/components/ui";
import { AuthForm } from "@/features/auth";
import styles from "./GuestCard.module.css";

/**
 * Card affichée dans Settings quand l'utilisateur n'est pas connecté.
 *
 * Gère son propre état d'ouverture de la modale auth — le lien
 * "Créer un compte" est géré directement dans AuthForm.
 */
export function GuestCard() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div>
      {/* ── Card invité ── */}
      <div className={styles.card}>
        <Avatar size="lg" />
        <Heading size="sm" align="center">Mode invité</Heading>
        <Text align="center">
          Connecte-toi pour synchroniser tes recettes et rejoindre un foyer.
        </Text>
        <Button onClick={() => setAuthOpen(true)}>Se connecter</Button>
      </div>

      {/* ── Modale auth (connexion + création de compte) ── */}
      <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}