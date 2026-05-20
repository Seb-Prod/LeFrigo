import { z } from "zod";

export const createRecipeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom est obligatoire")
    .max(100, "Nom trop long"),
});

export type CreateRecipeDto = z.infer<typeof createRecipeSchema>;
