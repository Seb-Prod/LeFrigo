import styles from "./TokenDataPanel.module.css";
import type { ResolvedColors } from "../../utils/color.utils";
import { getContrastLevel } from "../../utils/color.utils";

type Props = {
  surfaceHex: string | null;
  resolved: ResolvedColors | null;
};

/** Ligne réutilisable : pastille de couleur + valeur hex */
function DataRow({ label, hex }: { label: string; hex: string | null }) {
  return (
    <div className={styles.dataRow}>
      <dt>{label}</dt>
      <dd>
        <span className={styles.swatchDot} style={{ backgroundColor: hex ?? undefined }} />
        {hex ?? "—"}
      </dd>
    </div>
  );
}

/** Affiche les valeurs hex résolues (surface / fond / texte / bordure) et le ratio de contraste */
export function TokenDataPanel({ surfaceHex, resolved }: Props) {
  const contrastLevel = resolved ? getContrastLevel(resolved.contrast) : null;

  return (
    <dl className={styles.data}>
      <DataRow label="Surface" hex={surfaceHex} />
      <DataRow label="Background" hex={resolved?.background ?? null} />
      <DataRow label="Text" hex={resolved?.text ?? null} />
      <DataRow label="Border" hex={resolved?.border ?? null} />

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
  );
}