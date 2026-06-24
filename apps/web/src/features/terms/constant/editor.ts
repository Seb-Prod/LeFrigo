/**
 * Métadonnées globales de l'éditeur et de l'application LeFrigo.
 *
 * Utilisé pour les mentions légales, les crédits, les exports PDF
 * et tout affichage de version dans l'interface.
 */
export const EDITOR = {
  /** Nom de l'application */
  appName: "LeFrigo",

  /** Développeur principal */
  name: "Sébastien Drillaud",

  /** Adresse de contact */
  email: "sebastien.drillaud@gmail.com",

  /** URL publique de l'application */
  website: "lefrigo.fr",

  /** Mois et année de la version courante */
  version: "juin 2025",

  /** Identifiant de release affiché dans les mentions légales */
  release: "1.0 (beta)",
} as const;