import { userRepository } from "../repositories/user.repository";

export const userService = {
  getUsers: async () => {
    return userRepository.findAll();
  },
  createUser: async (data: { email: string; password: string }) => {

    return userRepository.create(data);

  },
};