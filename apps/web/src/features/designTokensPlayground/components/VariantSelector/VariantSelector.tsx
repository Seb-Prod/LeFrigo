import { Card, Heading } from "@/components/ui";
import { VARIANTS } from "../../constants/constants";
import styles from "./VariantSelector.module.css";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";

type Variant = (typeof VARIANTS)[number];

type Props = {
  value: Variant;
  onChange: (value: Variant) => void;
};

const VARIANT_LABELS: Record<Variant, string> = {
  solid: "Solid",
  soft: "Soft",
  outline: "Outline",
  ghost: "Ghost",
  plain: "Plain",
  link: "Link",
};

export function VariantSelector({ value, onChange }: Props) {
  return (
    <Card>
      <Heading>Variant</Heading>

      <div className={styles.variants}>
        {VARIANTS.map((variant) => {
          const isSelected = variant === value;

          return (
            <button
              key={variant}
              type="button"
              className={clsx(styles.variantItem, {
                [styles.selected]: isSelected,
              })}
              aria-label={VARIANT_LABELS[variant]}
              aria-pressed={isSelected}
              onClick={() => onChange(variant)}
            >
              <span className={styles.preview} data-variant={variant}>
                <span className={styles.variantExample}>Aperçu</span>

                <FaCheck
                  className={clsx(styles.checkmark, {
                    [styles.checkmarkMuted]: !isSelected,
                  })}
                />
              </span>

              <span className={styles.label}>{VARIANT_LABELS[variant]}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
