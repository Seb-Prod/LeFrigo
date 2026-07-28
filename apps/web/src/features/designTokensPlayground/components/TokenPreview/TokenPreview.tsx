import styles from "./TokenPreview.module.css";
import { COLORS, VARIANTS, STATES, SURFACES } from "../../constants/constants";

type Props = {
  surface: (typeof SURFACES)[number];
  color: (typeof COLORS)[number];
  variant: (typeof VARIANTS)[number];
  state: (typeof STATES)[number];
  surfaceRef: React.RefObject<HTMLDivElement | null>;
  pillRef: React.RefObject<HTMLSpanElement | null>;
};

/** Affiche la surface de fond et la pastille pilotée par les 4 data-attributes */
export function TokenPreview({
  surface,
  color,
  variant,
  state,
  surfaceRef,
  pillRef,
}: Props) {
  return (
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
  );
}
