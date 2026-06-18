import { useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import styles from "./InputNumber.module.css";
import clsx from "clsx";

type Props = {
  placeholder: string;
  value?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  error?: boolean;
};

export function InputNumber({
  placeholder,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  disabled = false,
}: Props) {
  const [rotation, setRotation] = useState("");

  const updateValue = (newValue: number) => {
    let next = newValue;

    if (min !== undefined) {
      next = Math.max(min, next);
    }

    if (max !== undefined) {
      next = Math.min(max, next);
    }

    onChange?.(next);
  };

  const handleIncrement = () => {
    updateValue((value ?? min) + step);

    setRotation(styles.rotateAdd);
    setTimeout(() => setRotation(""), 200);
  };

  const handleDecrement = () => {
    updateValue((value ?? min) - step);

    setRotation(styles.rotateRemove);
    setTimeout(() => setRotation(""), 200);
  };

  return (
    <div className={styles.center}>
      <div className={`${styles.content} ${rotation}`}>
        <span className={styles.text}>{placeholder}</span>

        <div className={styles.numberInput}>
          <button
            type="button"
            className={clsx(styles.btn, styles.decrement)}
            onClick={handleDecrement}
            disabled={disabled}
          >
            <IoIosRemove />
          </button>

          <div className={styles.value}>
            <input
              type="number"
              className={styles.number}
              value={value ?? ""}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              onChange={(e) => {
                const raw = e.target.value;

                if (raw === "") {
                  onChange?.(undefined);
                  return;
                }

                updateValue(Number(raw));
              }}
            />
          </div>

          <button
            type="button"
            className={clsx(styles.btn, styles.increment)}
            onClick={handleIncrement}
            disabled={disabled}
          >
            <IoIosAdd />
          </button>
        </div>
      </div>
    </div>
  );
}