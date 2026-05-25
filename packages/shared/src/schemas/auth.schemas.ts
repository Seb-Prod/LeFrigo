/**
 * @fileoverview Schémas de validation Zod pour l'authentification.
 * @module validation/auth.schemas
 */

import { z } from "zod";
import { AUTH_MESSAGES } from "./messages";

/**
 * Schéma de validation du formulaire de connexion.
 */
export const loginSchema = z.object({
  email: z.email(AUTH_MESSAGES.email.invalid),
  password: z.string().min(6, AUTH_MESSAGES.password.min),
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Type inféré depuis {@link loginSchema}.
 *
 * @typedef {Object} LoginDto
 * @property {string} email    - Adresse email valide.
 * @property {string} password - Mot de passe (min. 6 caractères).
 * @property {boolean} rememberMe - 
 */
export type LoginDto = z.infer<typeof loginSchema>;

/**
 * Schéma de validation du formulaire d'inscription.
 */
export const registerSchema = z
  .object({
    userName: z
      .string()
      .min(6, AUTH_MESSAGES.userName.min)
      .max(50, AUTH_MESSAGES.userName.tooLong),

    email: z
      .email(AUTH_MESSAGES.email.invalid)
      .max(254, AUTH_MESSAGES.email.tooLong),

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

    confirmPassword: z.string(),

    accept: z.literal(true, AUTH_MESSAGES.accept),
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
