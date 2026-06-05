"use client";

import { Modal, Text } from "@/components/ui";
import { usePwaInstall } from "../../hooks/usePwaInstall";
import { APP_CONFIG } from "@/config/app";
import { InstallPromptIos } from "../InstallPromptIos";

export function InstallPrompt() {
  const { os, showPrompt, dismiss } = usePwaInstall();
  return (
    <Modal
      open={showPrompt}
      onClose={dismiss}
      title={`Installer l'application sur ${os === "ios" ? "iPhone" : "Android"}`}
      animation="fade"
    >
      <Text>
        Ajoutez cette application à votre écran d'accueil pour y accéder
        facilement, comme une vraie app.
      </Text>
      {os === "ios" && <InstallPromptIos />}
      {os === "android" && <InstallPromptIos />}
    </Modal>
  );
}
