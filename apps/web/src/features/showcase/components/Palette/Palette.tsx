import { Heading, Row, Surface } from "@/components/ui";
import styles from "./Palette.module.css";

const palettes = [
  "primary",
  "accent",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
  "surface",
];

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/**
 * Page de démonstration de la palette de couleurs du design system.
 * Affiche chaque palette (primary, accent, ...) sous forme de bandes
 * de nuances (50 → 950), chaque nuance étant un swatch coloré
 * affichant sa valeur.
 *
 * États visuels :
 * - Le texte du swatch bascule automatiquement en couleur inversée
 *   (`--color-text-inverse`) à partir de la nuance 500, pour rester
 *   lisible sur fond foncé.
 */
export function Palettes() {
  return (
    <Surface fullScreen>
      <Heading>Palette</Heading>

      <div className={styles.container}>
        {palettes.map((palette) => (
          <div key={palette} className={styles.section}>
            {/* ── Nom de la palette ── */}
            <h2 className={styles.sectionTitle}>{palette}</h2>

            {/* ── Bande de nuances ── */}
            <Row justify="spaceBetween">
              {shades.map((shade) => {
                /** Fond clair (shade < 500) vs foncé (shade ≥ 500), pour le contraste du texte */
                const contrast = shade >= 500 ? "inverse" : "default";

                return (
                  <div
                    key={shade}
                    className={styles.swatch}
                    data-contrast={contrast}
                    style={{ background: `var(--${palette}-${shade})` }}
                  >
                    {shade}
                  </div>
                );
              })}
            </Row>
          </div>
        ))}
      </div>
    </Surface>
  );
}