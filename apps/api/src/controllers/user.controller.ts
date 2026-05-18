import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  getUsers: async (_: Request, res: Response) => {
    const users = await userService.getUsers();
    res.json(users);
  },
  createUser: async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const user = await userService.createUser({ email, password });

    res.json(user);

  },
};