import { Request, Response } from "express";
import { authService } from "./auth.service";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.json(user);
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  },
};