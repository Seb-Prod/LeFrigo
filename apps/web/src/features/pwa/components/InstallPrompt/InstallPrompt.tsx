"use client";

import { Modal, Text } from "@/components/ui";
import { usePwaInstall } from "../../hooks/usePwaInstall";
import { InstallPromptIos } from "./InstallPromptIos";
import { InstallPromptAndroid } from "./InstallPromptAndroid";

/**
 * Modal d'invitation à installer l'application en PWA.
 *
 * - Affiche automatiquement les instructions adaptées à l'OS détecté (`ios` | `android`)
 * - Délègue la logique de détection et de persistance du dismiss à `usePwaInstall`
 */
export function InstallPrompt() {
  const { os, showPrompt, dismiss } = usePwaInstall();

  return (
    <Modal
      open={showPrompt}
      onClose={dismiss}
      header={`Installer l'application sur ${os === "ios" ? "iPhone" : "Android"}`}
      animation="fade"
    >
      {/* ── Description ── */}
      <Text>
        Ajoutez cette application à votre écran d&apos;accueil pour y accéder
        facilement, comme une vraie app.
      </Text>

      {/* ── Instructions spécifiques à l'OS ── */}
      {os === "ios" && <InstallPromptIos />}
      {os === "android" && <InstallPromptAndroid />}
    </Modal>
  );
}