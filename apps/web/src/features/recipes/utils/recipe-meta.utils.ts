/**
 * Formate une valeur de métadonnée de recette pour l'affichage.
 *
 * Sans le flag `isTime`, retourne la valeur brute.
 * Avec `isTime`, convertit un nombre de minutes en durée lisible :
 * `"30"` → `"30 min"`, `"60"` → `"1 h"`, `"90"` → `"1 h 30 min"`.
 * Retourne `"-"` si la valeur est absente ou nulle.
 *
 * @param value - Valeur brute à formater (nombre de minutes en string, ou toute autre valeur)
 * @param isTime - Si `true`, interprète `value` comme une durée en minutes
 * @returns La valeur formatée pour l'affichage
 *
 * @example
 * formatMetaValue(null)           // "-"
 * formatMetaValue("4")            // "4"
 * formatMetaValue("30", true)     // "30 min"
 * formatMetaValue("60", true)     // "1 h"
 * formatMetaValue("90", true)     // "1 h 30 min"
 */
export function formatMetaValue(
  value: string | null,
  isTime?: boolean,
): string {
  if (!value) return "-";
  if (!isTime) return value;

  const minutes = Number(value);

  if (Number.isNaN(minutes)) return value;

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} h`;
  }

  if (remainingMinutes < 10) {
    return `${hours} h 0${remainingMinutes}`;
  }

  return `${hours} h ${remainingMinutes}`;
}

/** Formate la date de dernière activité en durée relative (ex : "Il y a 5 min"). */
export function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 60) return `Il y a ${diffMin} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  return `Il y a ${diffDays}j`;
}
