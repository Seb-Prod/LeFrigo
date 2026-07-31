import styles from "./MatrixSelectors.module.css";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { COLORS, VARIANTS, STATES, SURFACES } from "../../constants/constants";
import { ColorSelector } from "../ColorSelector";
import { SurfaceSelector } from "../SurfaceSelector";
import { VariantSelector } from "../VariantSelector";

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

      <SurfaceSelector value={surface} onChange={onSurfaceChange} />

      <ColorSelector value={color} onChange={onColorChange} />

      <VariantSelector value={variant} onChange={onVariantChange} />
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
