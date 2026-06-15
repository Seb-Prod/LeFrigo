/* ── Hook utilitaire ── */

/**
 * Retourne true uniquement après l'hydration côté client.
 * Utilise useSyncExternalStore — pattern recommandé par React
 * pour éviter les mismatches SSR sans setState dans un effet.
 */
export function useMounted(): boolean {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useSyncExternalStore } = require("react");
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}