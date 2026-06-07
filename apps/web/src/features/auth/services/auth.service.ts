import { request } from "@/lib/api/request";
import type {
  AuthResponse,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  RegisterResponse,
  ResetPassordDto,
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

  forgotPassword(data: ForgotPasswordDto) {
    return request<void>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  resetPassword(data: ResetPassordDto) {
    return request<void>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  verifyEmail(token: string) {
    return request<void>(`/auth/verify-email?token=${token}`, {
      method: "GET",
    });
  },
};
