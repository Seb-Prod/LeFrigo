import { NavLinkShowcase } from "../../components/NavLink/NavLink";
import { Palettes } from "../../components/Palette/Palette";

export const COMPONENTS = {
  palettes: { label: "Palettes", Component: Palettes },
  navLink: {label: "NavLink", Component: NavLinkShowcase}
} as const;

export type ComponentKey = keyof typeof COMPONENTS;