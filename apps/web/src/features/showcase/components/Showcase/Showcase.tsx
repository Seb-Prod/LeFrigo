"use client";

import { useState, type ComponentType } from "react";

import type { Color, Size, Variant } from "@/components/types";
import { ButtonGroup, Row } from "@/components/ui";

type ShowcaseControlledProps = {
  color?: Color;
  variant?: Variant;
  size?: Size;
};

type ShowcaseProps<
  TProps extends ShowcaseControlledProps,
> = {
  component: ComponentType<TProps>;

  componentProps: Omit<
    TProps,
    keyof ShowcaseControlledProps
  >;

  colors?: readonly Color[];
  variants?: readonly Variant[];
  sizes?: readonly Size[];
};

export function Showcase<
  TProps extends ShowcaseControlledProps,
>({
  component: Component,
  componentProps,
  colors = [],
  variants = [],
  sizes = [],
}: ShowcaseProps<TProps>) {
  const [color, setColor] = useState<Color>(colors[0] ?? "primary");
  const [variant, setVariant] = useState<Variant>(
    variants[0] ?? "solid",
  );
  const [size, setSize] = useState<Size>(sizes[0] ?? "md");

  return (
    <div>
      <Component
        {...componentProps}
        color={color}
        variant={variant}
        size={size}
      />
      <Row>{colors.length > 0 && (
        <ButtonGroup
          options={colors.map((color) => ({
            value: color,
          }))}
          value={color}
          onChange={setColor}
          aria-label="Couleur"
        />
      )}

      {variants.length > 0 && (
        <ButtonGroup
          options={variants.map((variant) => ({
            value: variant,
          }))}
          value={variant}
          onChange={setVariant}
          aria-label="Variante"
        />
      )}

      {sizes.length > 0 && (
        <ButtonGroup
          options={sizes.map((size) => ({
            value: size,
          }))}
          value={size}
          onChange={setSize}
          aria-label="Taille"
        />
      )}</Row>

      
    </div>
  );
}