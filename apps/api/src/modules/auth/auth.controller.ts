import {
  loginController,
  meController,
  passwordController,
  registerController,
  sessionController,
} from "./controller";

export const authController = {
  ...registerController,
  ...loginController,
  ...sessionController,
  ...passwordController,
  ...meController,
};
