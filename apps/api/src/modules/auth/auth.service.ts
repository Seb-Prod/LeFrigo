import {
  loginService,
  meService,
  passwordService,
  registerService,
  sessionService,
} from "./services";

export const authService = {
  ...registerService,
  ...loginService,
  ...sessionService,
  ...passwordService,
  ...meService,
};
