import styles from "./VariantStateMatrix.module.css";

/** Toutes les couleurs sémantiques disponibles dans le design system */
const COLORS = [
  "primary",
  "accent",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
] as const;

/** Variantes d'apparence, de la plus forte à la plus discrète */
const VARIANTS = [
  "solid",
  "soft",
  "outline",
  "ghost",
  "plain",
  "link",
] as const;

/** États visuels présentés dans la matrice */
const STATES = [
  "default",
  "hover",
  "active",
] as const;

export function VariantStateMatrix() {
  return (
    <div className={styles.page}>
      {COLORS.map((color) => (
        <section
          key={color}
          className={styles.colorBlock}
          data-color={color}
        >
          {/* ── En-tête de la couleur ── */}
          <header className={styles.colorHeader}>
            <span className={styles.colorIndicator} />
            <h2 className={styles.colorTitle}>{color}</h2>
          </header>

          {/* ── Matrice ── */}
          <div className={styles.matrix}>
            {/* En-tête des états */}
            <div className={styles.headerRow}>
              <span className={styles.variantHeader}>
                Variant
              </span>

              <div className={styles.statesHeader}>
                {STATES.map((state) => (
                  <span key={state} className={styles.stateHeader}>
                    {state}
                  </span>
                ))}
              </div>
            </div>

            {/* Variants */}
            {VARIANTS.map((variant) => (
              <div key={variant} className={styles.row}>
                <div className={styles.variantLabel}>
                  {variant}
                </div>

                <div className={styles.states}>
                  {STATES.map((state) => (
                    <div
                      key={state}
                      className={styles.swatch}
                    >
                      <span
                        data-variant={variant}
                        className={[
                          styles.pill,
                          styles[state],
                        ].join(" ")}
                      >
                        Aa
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}