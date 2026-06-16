import { AppError } from "apps/api/src/core/errors/AppError";
import { userRepository } from "../../users/user.repository";

export const usernameService = {
  changeUsername: async (userId: string, username: string) => {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND");
    }

    await userRepository.updateUsername(userId, username);

    return { message: "Pseudo changé" };
  },
};
