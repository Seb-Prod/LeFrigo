export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: SafeUser;
  sessionIdentifier: string;
};

export type SafeUser = {
  id: string;
  email: string;
  userName: string;
  role: string;
  status: string;
  emailVerified: boolean;
  createdAt: string;
};

export type RegisterResponse = SafeUser;

export interface UserSession {
  id: string;
  sessionIdentifier: string;

  userAgent: string | null;
  ip: string | null;

  createdAt: string;
  lastActivityAt: string;
  expiresAt: string;

  rememberMe: boolean;
}
