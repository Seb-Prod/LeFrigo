"use client";

import { Heading, Modal, Text } from "@/components/ui";
import { Os, usePwaInstall } from "../../hooks/usePwaInstall";
import { InstallPromptIos } from "./InstallPromptIos";
import { InstallPromptAndroid } from "./InstallPromptAndroid";
import { DeviceIcon } from "../DeviceIcon";
import { InstallPromptOther } from "./InstallPromptOther";

/**
 * Modal d'invitation à installer l'application en PWA.
 *
 * - Affiche automatiquement les instructions adaptées à l'OS détecté (`ios` | `android`)
 * - Délègue la logique de détection et de persistance du dismiss à `usePwaInstall`
 */
export function InstallPrompt() {
  // TODO: retirer avant merge
  const FORCE_OS: Os | null = "ios";

  const { os: detectedOs, showPrompt, dismiss } = usePwaInstall();
  const os = FORCE_OS ?? detectedOs;

  const OS_CONFIG: Record<
    Os,
    { label: string; instructions: React.ReactNode }
  > = {
    ios: {
      label: "iPhone",
      instructions: <InstallPromptIos />,
    },
    android: {
      label: "Android",
      instructions: <InstallPromptAndroid />,
    },
    other: {
      label: "votre appareil",
      instructions: <InstallPromptOther />,
    },
  };

  const { label, instructions } = OS_CONFIG[os];

  return (
    <Modal
      open={showPrompt}
      onClose={dismiss}
      header={<DeviceIcon device={os} />}
      animation="fade"
    >
      {/* ── Titre ── */}
      <Heading align="center">{`Installer l'application sur ${label}`}</Heading>

      {/* ── Description ── */}
      <Text>
        Ajoutez cette application à votre écran d&apos;accueil pour y accéder
        facilement, comme une vraie app.
      </Text>

      {/* ── Instructions spécifiques à l'OS ── */}
      {instructions}
    </Modal>
  );
}
