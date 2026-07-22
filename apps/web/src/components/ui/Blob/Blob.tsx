/**
 * Blob
 * Fond organique affiché derrière le contenu d'un trigger (survol / actif).
 * À placer comme enfant d'un élément portant les classes composées
 * .trigger (et .active si l'état actif doit persister l'animation).
 */
export function Blob() {
  return <span className={"blob"} aria-hidden="true" />;
}