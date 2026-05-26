export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: SafeUser;
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
