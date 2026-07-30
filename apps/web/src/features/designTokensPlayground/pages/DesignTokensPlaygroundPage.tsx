"use client";

import { useEffect, useRef, useState } from "react";
import { Surface } from "@/components/ui/Surface";
import { COLORS, VARIANTS, STATES, SURFACES } from "../constants/constants";
import {
  rgbToHex,
  getContrastRatio,
  type ResolvedColors,
} from "../utils/color.utils";
import { MatrixSelectors } from "../components/MatrixSelectors";
import { TokenPreview } from "../components/TokenPreview";
import { TokenDataPanel } from "../components/TokenDataPanel";
import styles from "./DesignTokensPlaygroundPage.module.css";
import { ColorSelector } from "../components/ColorSelector";

/**
 * Playground de test pour les tokens de couleur : permet de choisir
 * une surface, une couleur, un variant et un état, puis affiche la
 * pastille résultante accompagnée des valeurs hexadécimales réellement
 * appliquées (fond / texte / bordure), lues via getComputedStyle.
 */
export function DesignTokensPlaygroundPage() {
  const [surface, setSurface] =
    useState<(typeof SURFACES)[number]>("background");
  const [color, setColor] = useState<(typeof COLORS)[number]>("accent");
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>("solid");
  const [state, setState] = useState<(typeof STATES)[number]>("default");

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

  return (
    <Surface fullScreen>
      <MatrixSelectors
        surface={surface}
        color={color}
        variant={variant}
        state={state}
        onSurfaceChange={setSurface}
        onColorChange={setColor}
        onVariantChange={setVariant}
        onStateChange={setState}
      />
      <section className={styles.section}>
        <TokenPreview
          surface={surface}
          color={color}
          variant={variant}
          state={state}
          surfaceRef={surfaceRef}
          pillRef={pillRef}
        />

        <TokenDataPanel surfaceHex={surfaceHex} resolved={resolved} />
      </section>
    </Surface>
  );
}
