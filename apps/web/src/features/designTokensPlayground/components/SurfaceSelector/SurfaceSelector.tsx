import { Card, Heading } from "@/components/ui";
import { SURFACES } from "../../constants/constants";
import styles from "./SurfaceSelector.module.css";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";

type Surface = (typeof SURFACES)[number];

type Props = {
  value: Surface;
  onChange: (value: Surface) => void;
};

const SURFACE_LABELS: Record<Surface, string> = {
  background: "Arrière-plan",
  surface: "Surface",
  "surface-secondary": "Secondaire",
  "surface-tertiary": "Tertiaire",
  "surface-elevated": "Surélevée",
};

export function SurfaceSelector({ value, onChange }: Props) {
  return (
    <Card>
      <Heading>Surface</Heading>

      <div className={styles.surfaces}>
        {SURFACES.map((surface) => {
          const isSelected = surface === value;

          return (
            <button
              key={surface}
              type="button"
              className={clsx(styles.surfaceItem, {
                [styles.selected]: isSelected,
              })}
              data-surface={surface}
              aria-label={SURFACE_LABELS[surface]}
              aria-pressed={isSelected}
              onClick={() => onChange(surface)}
            >
              <span className={styles.preview}>
                <FaCheck
                  className={clsx(styles.checkmark, {
                    [styles.checkmarkMuted]: !isSelected,
                  })}
                />
              </span>

              <span className={styles.label}>{SURFACE_LABELS[surface]}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}