
import { Palettes } from "../../components/Palette/Palette";
import { NavLinkShowcase } from "../../showcases/NavLink";

export const COMPONENTS = {
  palettes: { label: "Palettes", Component: Palettes },
  navLink: {label: "NavLink", Component: NavLinkShowcase}
} as const;

export type ComponentKey = keyof typeof COMPONENTS;