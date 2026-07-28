/** Valeurs hexadécimales résolues pour la pastille actuellement affichée */
export type ResolvedColors = {
  background: string;
  text: string;
  border: string;
  contrast: number;
};

/**
 * Convertit une couleur au format rgb(...)/rgba(...) renvoyée par
 * getComputedStyle en hexadécimal. Retourne "transparent" si l'alpha
 * est à 0, ou la valeur d'origine si le format n'est pas reconnu.
 */
export function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return rgb;

  const [, r, g, b, a] = match;

  /* Alpha explicitement à 0 → couleur réellement transparente, pas du noir */
  if (a !== undefined && Number(a) === 0) return "transparent";

  const toHex = (value: string) => Number(value).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/** Convertit une couleur hexadécimale en luminance relative WCAG. */
export function getRelativeLuminance(hex: string): number {
  if (hex === "transparent") return 0;

  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;

  const linearize = (channel: number) =>
    channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);

  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** Calcule le ratio de contraste WCAG entre deux couleurs. */
export function getContrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);

  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

/** Traduit un ratio de contraste en niveau de conformité WCAG. */
export function getContrastLevel(ratio: number) {
  if (ratio >= 7) return { label: "AAA", description: "Excellent" };
  if (ratio >= 4.5) return { label: "AA", description: "Conforme texte normal" };
  if (ratio >= 3) return { label: "AA Large", description: "Conforme texte large" };
  return { label: "Fail", description: "Non conforme" };
}