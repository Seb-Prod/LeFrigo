/**
 * @fileoverview Messages d'erreur centralisés pour les schémas de validation d'authentification.
 * @module validation/messages
 */

/**
 * Messages d'erreur utilisés dans les schémas Zod d'authentification.
 * @constant
 */
export const AUTH_MESSAGES = {
  userName: {
    min: "Le pseudo doit contenir au moins 8 caractères",
    tooLong: "le pseudo ne peut peut pas dépasser 50 caractères",
  },

  email: {
    invalid: "Adresse email invalide",
    tooLong: "L'adresse email ne peut pas dépasser 254 caractères",
  },

  password: {
    min: "Le mot de passe doit contenir au moins 6 caractères",
    tooLong: "Le mot de passe ne peut pas dépasser 128 caractères",
    uppercase: "1 majuscule requise",
    lowercase: "1 minuscule requise",
    digit: "1 chiffre requis",
    special: "1 caractère spécial requis",
  },

  confirmPassword: {
    mismatch: "Les mots de passe ne correspondent pas",
  },

  accept: "Vous devez accepter les conditions d'utilisation"
} as const;
