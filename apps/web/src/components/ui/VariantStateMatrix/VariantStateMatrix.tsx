"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VariantStateMatrix.module.css";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Surface } from "../Surface";

const COLORS = [
  "primary",
  "accent",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
] as const;

const VARIANTS = [
  "solid",
  "soft",
  "outline",
  "ghost",
  "plain",
  "link",
] as const;

const STATES = ["default", "hover", "active"] as const;

const SURFACES = [
  "background",
  "surface",
  "surface-secondary",
  "surface-tertiary",
  "surface-elevated",
] as const;

/** Valeurs hexadécimales résolues pour la pastille actuellement affichée */
type ResolvedColors = {
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
function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return rgb;

  const [, r, g, b, a] = match;

  /* Alpha explicitement à 0 → couleur réellement transparente, pas du noir */
  if (a !== undefined && Number(a) === 0) return "transparent";

  const toHex = (value: string) => Number(value).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Convertit une couleur hexadécimale en luminance relative WCAG.
 */
function getRelativeLuminance(hex: string): number {
  if (hex === "transparent") return 0;

  const value = hex.replace("#", "");

  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;

  const linearize = (channel: number) =>
    channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);

  const R = linearize(r);
  const G = linearize(g);
  const B = linearize(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calcule le ratio de contraste WCAG entre deux couleurs.
 */
function getContrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = getRelativeLuminance(foreground);

  const backgroundLuminance = getRelativeLuminance(background);

  const lighter = Math.max(foregroundLuminance, backgroundLuminance);

  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function getContrastLevel(ratio: number) {
  if (ratio >= 7) {
    return {
      label: "AAA",
      description: "Excellent",
    };
  }

  if (ratio >= 4.5) {
    return {
      label: "AA",
      description: "Conforme texte normal",
    };
  }

  if (ratio >= 3) {
    return {
      label: "AA Large",
      description: "Conforme texte large",
    };
  }

  return {
    label: "Fail",
    description: "Non conforme",
  };
}

/**
 * Playground de test pour les tokens de couleur : permet de choisir
 * une surface, une couleur, un variant et un état, puis affiche la
 * pastille résultante accompagnée des valeurs hexadécimales réellement
 * appliquées (fond / texte / bordure), lues via getComputedStyle.
 */
export function VariantStateMatrix() {
  const [surface, setSurface] =
    useState<(typeof SURFACES)[number]>("background");
  const [color, setColor] = useState<(typeof COLORS)[number]>("primary");
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>("solid");
  const [state, setState] = useState<(typeof STATES)[number]>("default");

  /** Référence vers la pastille affichée, pour lire son style calculé */
  const pillRef = useRef<HTMLSpanElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  const [resolved, setResolved] = useState<ResolvedColors | null>(null);
  const [surfaceHex, setSurfaceHex] = useState<string | null>(null);

  /** Relit les couleurs calculées à chaque changement de sélection */
  useEffect(() => {
    if (!pillRef.current || !surfaceRef.current) return;

    const computed = getComputedStyle(pillRef.current);

    const background = rgbToHex(computed.backgroundColor);

    const text = rgbToHex(computed.color);

    const border = rgbToHex(computed.borderColor);

    setResolved({
      background,
      text,
      border,
      contrast: getContrastRatio(text, background),
    });

    setSurfaceHex(
      rgbToHex(getComputedStyle(surfaceRef.current).backgroundColor),
    );
  }, [surface, color, variant, state]);

  const contrastLevel = resolved ? getContrastLevel(resolved.contrast) : null;

  return (
    <Surface fullScreen>
      {/* ── Sélecteurs ── */}
      <section className={styles.section}>
        <ButtonGroup
          label="Surface"
          value={surface}
          options={SURFACES.map((value) => ({ value }))}
          onChange={setSurface}
        />

        <ButtonGroup
          label="Couleur"
          value={color}
          options={COLORS.map((value) => ({ value }))}
          onChange={setColor}
        />

        <ButtonGroup
          label="Variant"
          value={variant}
          options={VARIANTS.map((value) => ({ value }))}
          onChange={setVariant}
        />

        <ButtonGroup
          label="State"
          value={state}
          options={STATES.map((value) => ({ value }))}
          onChange={setState}
        />
      </section>

      {/* ── Aperçu + valeurs résolues ── */}
      <section className={styles.section}>
        <div data-surface={surface} ref={surfaceRef} className={styles.surface}>
          <span
            ref={pillRef}
            data-color={color}
            data-variant={variant}
            data-state={state}
            className={styles.watch}
          >
            Aa
          </span>
        </div>

        {/* ── Données résolues ── */}
        <dl className={styles.data}>
          <div className={styles.dataRow}>
            <dt>Surface</dt>
            <dd>
              <span
                className={styles.swatchDot}
                style={{ backgroundColor: surfaceHex ?? undefined }}
              />
              {surfaceHex ?? "—"}
            </dd>
          </div>

          <div className={styles.dataRow}>
            <dt>Background</dt>
            <dd>
              <span
                className={styles.swatchDot}
                style={{ backgroundColor: resolved?.background }}
              />
              {resolved?.background ?? "—"}
            </dd>
          </div>

          <div className={styles.dataRow}>
            <dt>Text</dt>
            <dd>
              <span
                className={styles.swatchDot}
                style={{ backgroundColor: resolved?.text }}
              />
              {resolved?.text ?? "—"}
            </dd>
          </div>

          <div className={styles.dataRow}>
            <dt>Border</dt>
            <dd>
              <span
                className={styles.swatchDot}
                style={{ backgroundColor: resolved?.border }}
              />
              {resolved?.border ?? "—"}
            </dd>
          </div>
          <div className={styles.dataRow}>
            <dt>Contrast</dt>

            <dd>
              {resolved && contrastLevel ? (
                <>
                  <strong>{resolved.contrast.toFixed(2)}:1</strong>

                  <span>{contrastLevel.label}</span>
                </>
              ) : (
                "—"
              )}
            </dd>
          </div>
        </dl>
      </section>
    </Surface>
  );
}
