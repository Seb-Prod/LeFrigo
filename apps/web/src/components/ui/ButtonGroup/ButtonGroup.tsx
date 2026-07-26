"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./ButtonGroup.module.css";
import { Color, Size, Variant } from "@/components/types";

export type ButtonGroupOption<T extends string> = {
  value: T;
  label?: ReactNode;
};

type Props<T extends string> = {
  options: ButtonGroupOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  "aria-label"?: string;
  color?: Color;
  size?: Size;
  variant?: Variant;
};

export function ButtonGroup<T extends string>({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
  color = "primary",
  size = "md",
  variant = "soft",
}: Props<T>) {
  return (
    <div
      className={clsx(styles.buttonGroup, className)}
      role="group"
      aria-label={ariaLabel}
      data-color={color}
      data-size={size}
      data-variant={variant}
    >
      {options.map((option) => {
        const active = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={styles.button}
            data-active={active}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
          >
            {option.label ?? option.value}
          </button>
        );
      })}
    </div>
  );
}
