/**
 * @fileoverview Messages d'erreur centralisés pour les schémas de validation d'authentification.
 * @module validation/messages
 */

/**
 * Messages d'erreur utilisés dans les schémas Zod d'authentification.
 * @constant
 *
 * @example
 * // Utilisation dans un schéma Zod
 * z.email(AUTH_MESSAGES.email.invalid)
 * z.string().min(8, AUTH_MESSAGES.password.min)
 */
export const AUTH_MESSAGES = {
  /**
   * Messages liés au champ `email`.
   */
  email: {
    /** Affiché quand la valeur n'est pas un email valide. */
    invalid: "Adresse email invalide",
  },

  /**
   * Messages liés au champ `password`.
   */
  password: {
    /** Affiché quand le mot de passe fait moins de 6 caractères (loginSchema). */
    min: "Le mot de passe doit contenir au moins 6 caractères",
    /** Affiché quand le mot de passe ne contient pas de majuscule. */
    uppercase: "1 majuscule requise",
    /** Affiché quand le mot de passe ne contient pas de minuscule. */
    lowercase: "1 minuscule requise",
    /** Affiché quand le mot de passe ne contient pas de chiffre. */
    digit: "1 chiffre requis",
    /** Affiché quand le mot de passe ne contient pas de caractère spécial. */
    special: "1 caractère spécial requis",
  },

  /**
   * Messages liés au champ `confirmPassword`.
   */
  confirmPassword: {
    /** Affiché quand `confirmPassword` est différent de `password`. */
    mismatch: "Les mots de passe ne correspondent pas",
  },
} as const;