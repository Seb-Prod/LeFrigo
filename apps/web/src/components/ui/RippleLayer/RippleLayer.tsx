import type { Ripple } from "@/hooks/useRipple";

type Props = {
  ripples: Ripple[];
};

/**
 * RippleLayer
 * Affiche la liste des ripples actifs, positionnés au point de contact (x, y).
 * À placer comme enfant de tout élément avec position relative
 * (button, badge, wrapper d'input...).
 */
export function RippleLayer({ ripples }: Props) {
  return (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={"ripple"}
          aria-hidden="true"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </>
  );
}