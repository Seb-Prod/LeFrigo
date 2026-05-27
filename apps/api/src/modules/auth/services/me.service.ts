import { AppError } from "../../../core/errors/AppError";
import { userRepository } from "../../users/user.repository";
import { toSafeUser } from "../../users/user.types";

export const meService = {
  /**
   * Récupère les informations de l'utilisateur connecté.
   *
   * @param userId - Identifiant de l'utilisateur extrait du JWT.
   * @returns L'utilisateur sans données sensibles (`SafeUser`).
   * @throws {AppError} 404 si l'utilisateur est introuvable.
   */

  me: async (userId: string) => {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "utilisateur introuvable");
    }
    return toSafeUser(user);
  },
};
