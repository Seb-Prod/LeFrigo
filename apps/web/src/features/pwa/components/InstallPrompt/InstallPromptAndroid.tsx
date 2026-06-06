import { MdAddToHomeScreen } from "react-icons/md";
import { Text, Carousel } from "@/components/ui";

/**
 * Contenu du carousel d'installation PWA pour Android.
 * Chaque slide associe une capture d'écran à une instruction textuelle.
 */
const ANDROID_SLIDES = [
  {
    src: "step-1.png",
    label: "Ouvrez le menu Chrome en haut de votre écran.",
  },
  {
    src: "step-2.png",
    label: (
      <Text>
        Appuyez sur «<MdAddToHomeScreen />{" "}
        <strong>Ajouter à l&apos;écran d&apos;accueil</strong>»
      </Text>
    ),
  },
  {
    src: "step-3.png",
    label: (
      <Text>
        Confirmez en appuyant sur «<strong>Ajouter</strong>»
      </Text>
    ),
  },
];

/**
 * Instructions d'installation PWA spécifiques à Android.
 * Affiche un carousel guidant l'utilisateur étape par étape.
 */
export function InstallPromptAndroid() {
  return <Carousel slides={ANDROID_SLIDES} basePath="pwa/android" />;
}