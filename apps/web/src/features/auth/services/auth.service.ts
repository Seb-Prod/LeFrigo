import { request } from "@/lib/api/request";
import { authStorage } from "@/lib/auth";
import type {
  AuthResponse,
  ChangePasswordDto,
  ChangeUsernameDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  RegisterResponse,
  ResetPasswordDto,
  SafeUser,
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

  resetPassword(data: ResetPasswordDto) {
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

  resendVerification(email: string) {
    return request<void>("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  changePassword(data: ChangePasswordDto) {
    return request<void>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        sessionIdentifier: authStorage.getSessionIdentifier(),
      }),
    });
  },

  changeUsername(data: ChangeUsernameDto) {
    return request<void>("/profile/username", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  me() {
    return request<SafeUser>("/auth/me");
  },
};
