import { Carousel } from "@/components/ui";

/**
 * Contenu du carousel d'installation PWA pour Other.
 * Chaque slide associe une capture d'écran à une instruction textuelle.
 */
const OTHER_SLIDES = [
  {
    src: "step-1.png",
    label:
      "Consultez les options d'installation de votre navigateur pour ajouter cette application à votre écran d'accueil.",
  },
];

/**
 * Instructions d'installation PWA spécifiques à Other
 * Affiche un carousel guidant l'utilisateur étape par étape.
 */
export function InstallPromptOther() {
  return <Carousel slides={OTHER_SLIDES} basePath="pwa/other" />;
}
