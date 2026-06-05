import { MdIosShare, MdMoreHoriz } from "react-icons/md";
import { Text, Carousel } from "@/components/ui";
import { CiSquarePlus } from "react-icons/ci";

const IOS_SLIDES = [
  { src: "step-1.png", label: "Ouvrez le menu Safari en bas de votre écran." },
  {
    src: "step-2.png",
    label: (
      <Text>
        Appuyez sur «<MdIosShare /> <strong>Partager</strong>»
      </Text>
    ),
  },
  {
    src: "step-3.png",
    label: (
      <Text>
        Appuyez sur «<MdMoreHoriz /> <strong>Plus</strong>»
      </Text>
    ),
  },
  {
    src: "step-4.png",
    label: (
      <Text>
        Appuyez sur «<CiSquarePlus />
        <strong>Sur l&apos;écran d&apos;accueil</strong>»
      </Text>
    ),
  },
  {
    src: "step-5.png",
    label: (
      <Text>
        Appuyez sur <strong>Ajouter</strong>
      </Text>
    ),
  },
];

export function InstallPromptIos() {
  return <Carousel slides={IOS_SLIDES} basePath="/pwa/ios" />;
}
