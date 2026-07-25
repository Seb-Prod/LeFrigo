"use client";

import type { Size } from "@/components/types";
import styles from "./SizeSelector.module.css";

const SIZES: Size[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

type SizeSelectorProps = {
  value: Size;
  onChange: (size: Size) => void;
  label?: string;
};

export function SizeSelector({
  value,
  onChange,
  label = "Taille",
}: SizeSelectorProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>
        {label}
      </h3>

      <div className={styles.sizeSelector}>
        {SIZES.map((size) => {
          const active = value === size;

          return (
            <button
              key={size}
              type="button"
              className={styles.sizeButton}
              data-active={active}
              aria-pressed={active}
              onClick={() => onChange(size)}
            >
              {size}
            </button>
          );
        })}
      </div>
    </section>
  );
}