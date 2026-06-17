import { useEffect, useState } from "react";

/**
 * Retarde la mise à jour d'une valeur jusqu'à ce que l'utilisateur
 * arrête de la modifier pendant `delay` ms.
 *
 * @param value - Valeur à debouncer.
 * @param delay - Délai en millisecondes (défaut : 300ms).
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}