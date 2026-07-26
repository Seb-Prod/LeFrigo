import { NavLink } from "@/components/ui";
import { Showcase } from "../components/Showcase/Showcase";
import { ButtonVariant, Color, Size } from "@/components/types";

const BUTTON_COLORS: Color[] = [
  "primary",
  "accent",
  "neutral",
  "info",
  "success",
  "warning",
  "danger",
];

const BUTTON_VARIANTS: ButtonVariant[] = ["solid", "soft", "outline", "ghost"];

const BUTTON_SIZES: Size[] = ["xs", "sm", "md", "lg", "xl"];

export function NavLinkShowcase() {
  return (
    <Showcase
      component={NavLink}
      componentProps={{
        href: "/",

        label: "Accueil",
      }}
      colors={BUTTON_COLORS}
      variants={BUTTON_VARIANTS}
      sizes={BUTTON_SIZES}
    />
  );
}
