import { request } from "@/lib/api/request";
import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
  RegisterResponse,
  UserSession,
} from "@lefrigo/shared";

export const authService = {
  login(data: LoginDto) {
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout(refreshToken: string) {
    return request<void>("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  },

  logoutAllDevices(sessionIdentifier: string) {
    return request<void>("/auth/logout-all", {
      method: "POST",
      body: JSON.stringify({

      sessionIdentifier,

    }),
    });
  },

  revokeSession(sessionId: string) {
    return request<void>(`/auth/sessions/${sessionId}`, {
      method: "DELETE",
    });
  },

  getSessions() {
    return request<UserSession[]>("/auth/sessions");
  },

  register(data: RegisterDto) {
    return request<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
