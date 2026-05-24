/**
 * @fileoverview Schémas de validation Zod pour l'authentification.
 * @module validation/auth.schemas
 */

import { z } from "zod";
import { AUTH_MESSAGES } from "./messages";

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

/**
 * Schéma de validation du formulaire de connexion.
 *
 * @remarks
 * Utilisé côté client pour valider les champs avant soumission,
 * et côté serveur pour parser le body de la requête.
 *
 * @example
 * const result = loginSchema.safeParse(req.body);
 *
 * if (!result.success) {
 *   return res.status(400).json(result.error.flatten().fieldErrors);
 * }
 *
 * const { email, password } = result.data;
 */
export const loginSchema = z.object({
  /**
   * Adresse email de l'utilisateur.
   * @example "user@example.com"
   */
  email: z.email(AUTH_MESSAGES.email.invalid),

  /**
   * Mot de passe de l'utilisateur.
   * Minimum 6 caractères.
   */
  password: z.string().min(6, AUTH_MESSAGES.password.min),
});

/**
 * Type inféré depuis {@link loginSchema}.
 *
 * @typedef {Object} LoginDto
 * @property {string} email    - Adresse email valide.
 * @property {string} password - Mot de passe (min. 6 caractères).
 */
export type LoginDto = z.infer<typeof loginSchema>;

// ---------------------------------------------------------------------------
// Register
// ---------------------------------------------------------------------------

/**
 * Schéma de validation du formulaire d'inscription.
 *
 * @remarks
 * - Le mot de passe doit respecter 5 règles cumulatives (longueur, casse, chiffre, spécial).
 * - `confirmPassword` est validé en cross-field via `.refine()` :
 *   l'erreur est attachée au path `["confirmPassword"]`.
 *
 * @example
 * const result = registerSchema.safeParse(req.body);
 *
 * if (!result.success) {
 *   return res.status(400).json(result.error.flatten().fieldErrors);
 * }
 *
 * const { email, password } = result.data;
 */
export const registerSchema = z
  .object({
    /**
     * Pseudo de l'utilisateur
     * @example "grogou"
     */
    userName: z
      .string()
      .min(6, AUTH_MESSAGES.userName.min)
      .max(50, AUTH_MESSAGES.userName.tooLong),

    /**
     * Adresse email de l'utilisateur.
     * @example "user@example.com"
     */
    email: z
      .email(AUTH_MESSAGES.email.invalid)
      .max(254, AUTH_MESSAGES.email.tooLong),

    /**
     * Mot de passe de l'utilisateur.
     *
     * Règles :
     * - Minimum 8 caractères
     * - Au moins 1 majuscule `[A-Z]`
     * - Au moins 1 minuscule `[a-z]`
     * - Au moins 1 chiffre `[0-9]`
     * - Au moins 1 caractère spécial `[^A-Za-z0-9]`
     *
     * @example "Secure@123"
     */
    password: z
      .string()
      .min(6, AUTH_MESSAGES.password.min)
      .max(128, AUTH_MESSAGES.password.tooLong)
      .superRefine((val, ctx) => {
        const rules = [
          { test: /[A-Z]/, message: AUTH_MESSAGES.password.uppercase },
          { test: /[a-z]/, message: AUTH_MESSAGES.password.lowercase },
          { test: /[0-9]/, message: AUTH_MESSAGES.password.digit },
          { test: /[^A-Za-z0-9]/, message: AUTH_MESSAGES.password.special },
        ];

        rules.forEach(({ test, message }) => {
          if (!test.test(val)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message });
          }
        });
      }),

    /**
     * Confirmation du mot de passe.
     * Doit être identique au champ `password`.
     */
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_MESSAGES.confirmPassword.mismatch,
    path: ["confirmPassword"],
  });

/**
 * Type inféré depuis {@link registerSchema}.
 *
 * @typedef {Object} RegisterDto
 * @property {string} email           - Adresse email valide.
 * @property {string} password        - Mot de passe fort (min. 6 caractères).
 * @property {string} confirmPassword - Doit correspondre à `password`.
 */
export type RegisterDto = z.infer<typeof registerSchema>;
