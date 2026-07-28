import styles from "./MatrixSelectors.module.css";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { COLORS, VARIANTS, STATES, SURFACES } from "../../constants/constants";

type Props = {
  surface: (typeof SURFACES)[number];
  color: (typeof COLORS)[number];
  variant: (typeof VARIANTS)[number];
  state: (typeof STATES)[number];
  onSurfaceChange: (value: (typeof SURFACES)[number]) => void;
  onColorChange: (value: (typeof COLORS)[number]) => void;
  onVariantChange: (value: (typeof VARIANTS)[number]) => void;
  onStateChange: (value: (typeof STATES)[number]) => void;
};

/** Regroupe les 4 sélecteurs (surface / couleur / variant / état) du playground */
export function MatrixSelectors({
  surface,
  color,
  variant,
  state,
  onSurfaceChange,
  onColorChange,
  onVariantChange,
  onStateChange,
}: Props) {
  return (
    <section className={styles.section}>
      <ButtonGroup
        label="Surface"
        value={surface}
        options={SURFACES.map((value) => ({ value }))}
        onChange={onSurfaceChange}
      />

      <ButtonGroup
        label="Couleur"
        value={color}
        options={COLORS.map((value) => ({ value }))}
        onChange={onColorChange}
      />

      <ButtonGroup
        label="Variant"
        value={variant}
        options={VARIANTS.map((value) => ({ value }))}
        onChange={onVariantChange}
      />

      <ButtonGroup
        label="State"
        value={state}
        options={STATES.map((value) => ({ value }))}
        onChange={onStateChange}
      />
    </section>
  );
}