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
   * Messages liés au champ `userName`
   */
  userName: {
    min: "Le pseudo doit contenir au moins 8 caractères",
    tooLong: "le pseudo ne peut peut pas dépasser 50 caractères",
  },

  /**
   * Messages liés au champ `email`.
   */
  email: {
    invalid: "Adresse email invalide",
    tooLong: "L'adresse email ne peut pas dépasser 254 caractères",
  },

  /**
   * Messages liés au champ `password`.
   */
  password: {
    min: "Le mot de passe doit contenir au moins 6 caractères",
    tooLong: "Le mot de passe ne peut pas dépasser 128 caractères",
    uppercase: "1 majuscule requise",
    lowercase: "1 minuscule requise",
    digit: "1 chiffre requis",
    special: "1 caractère spécial requis",
  },

  /**
   * Messages liés au champ `confirmPassword`.
   */
  confirmPassword: {
    mismatch: "Les mots de passe ne correspondent pas",
  },
} as const;
