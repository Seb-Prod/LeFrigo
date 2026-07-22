import { useRef, useState } from "react";

export type Ripple = { id: number; x: number; y: number };

/**
 * useRipple
 * Gère une liste de ripples déclenchés au clic, positionnés au point de contact,
 * et auto-nettoyés après la durée de l'animation.
 */
export function useRipple(duration = 600) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  /** À attacher sur onClick (ou onMouseDown) de l'élément cible */
  const addRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = rippleId.current++;

    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, duration);
  };

  return { ripples, addRipple };
}