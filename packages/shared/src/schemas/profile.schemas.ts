import { z } from "zod";
import { AUTH_MESSAGES } from "./messages";

/**
 * Schéma de validation du formulaire de changement de nom d'utilisateur.
 */
export const changeUsernameSchema = z.object({
  userName: z
    .string()
    .min(6, AUTH_MESSAGES.userName.min)
    .max(50, AUTH_MESSAGES.userName.tooLong),
});

/**
 * Type inféré depuis {@link changeUsernameSchema}.
 *
 * @typedef {Object} ChangeUsernameDto
 * @property {string} userName - Nouveau nom d'utilisateur (6–50 caractères).
 */
export type ChangeUsernameDto = z.infer<typeof changeUsernameSchema>;