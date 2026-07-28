"use client";

import styles from "./ButtonGroup.module.css";

type ButtonGroupOption<T extends string> = {
  value: T;
  label?: string;
};

type ButtonGroupProps<T extends string> = {
  options: readonly ButtonGroupOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  color?: "primary"
};

export function ButtonGroup<T extends string>({
  options,
  value,
  onChange,
  label,
  color = "primary"
}: ButtonGroupProps<T>) {
  return (
    <div className={styles.group} data-color={color}>
      {label && (
        <span className={styles.label}>
          {label}
        </span>
      )}

      <div className={styles.buttons}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.button}
            data-active={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label ?? option.value}
          </button>
        ))}
      </div>
    </div>
  );
}