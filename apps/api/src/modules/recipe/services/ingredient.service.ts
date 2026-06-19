import { AppError } from "../../../core/errors/AppError";
import { ingredientRepository } from "../repositories";

export const ingredientService = {
  /**
   * Recherche les ingrédients existants pour l'autocomplete.
   *
   * - Rejette les queries trop courtes pour éviter les recherches inutiles.
   *
   * @param query - Chaîne de recherche (min. 1 caractère).
   * @returns Liste d'ingrédients correspondants (max. 10).
   * @throws {AppError} 400 `QUERY_TOO_SHORT` si la query est vide.
   */
  search: async (query: string) => {
    if (!query?.trim()) {
      throw new AppError(400, "QUERY_TOO_SHORT");
    }

    return ingredientRepository.search(query.trim());
  },
};
