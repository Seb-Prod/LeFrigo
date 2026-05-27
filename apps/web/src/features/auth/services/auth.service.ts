import { request } from "@/lib/api/request";
import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
  RegisterResponse,
} from "@lefrigo/shared";

export const authService = {
  login(data: LoginDto ) {
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout(refreshToken: string) {
  return request<void>("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  })
},

  register(data: RegisterDto) {
    return request<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
