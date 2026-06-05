"use client";

import { Modal, Text } from "@/components/ui";
import { usePwaInstall } from "../../hooks/usePwaInstall";
import { InstallPromptIos } from "./InstallPromptIos";
import { InstallPromptAndroid } from "./InstallPromptAndroid";

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
        Ajoutez cette application à votre écran d&apos;accueil pour y accéder
        facilement, comme une vraie app.
      </Text>
      <br/>
      {os === "ioss" && <InstallPromptIos />}
      {os === "ios" && <InstallPromptAndroid />}
    </Modal>
  );
}
