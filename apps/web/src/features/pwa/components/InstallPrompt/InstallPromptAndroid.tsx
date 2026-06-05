import { MdAddToHomeScreen } from "react-icons/md";
import { Text, Carousel } from "@/components/ui";

const IOS_SLIDES = [
  { src: "step-1.png", label: "Ouvrez le menu Chrome en haut de votre écran." },
  {
    src: "step-2.png",
    label: (
      <Text>
        Appuyez sur «<MdAddToHomeScreen /> <strong>Ajouter à l&apos;écran d&apos;accueil</strong>»
      </Text>
    ),
  },
  {
    src: "step-3.png",
    label: (
      <Text>
        Confirmer en appuyant sur «<strong>Ajouter</strong>»
      </Text>
    ),
  },
];

export function InstallPromptAndroid() {
  return <Carousel slides={IOS_SLIDES} basePath="/pwa/android" />;
}
