"use client";

import type { Size } from "@/components/types";
import { ButtonGroup } from "@/components/ui";
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

      <ButtonGroup
        options={SIZES.map((size) => ({
          value: size,
        }))}
        value={value}
        onChange={onChange}
        aria-label={label}
      />
    </section>
  );
}