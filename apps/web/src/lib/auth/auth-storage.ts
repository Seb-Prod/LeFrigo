import type { SafeUser } from "@lefrigo/shared";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";
const SESSION_IDENTIFIER_KEY = "sessionIdentifier";

export const authStorage = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  getUser(): SafeUser | null {
    const raw = localStorage.getItem(USER_KEY);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setUser(user: SafeUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getSessionIdentifier() {
    return localStorage.getItem(SESSION_IDENTIFIER_KEY);
  },

  setSessionIdentifier(value: string) {
    localStorage.setItem(SESSION_IDENTIFIER_KEY, value);
  },

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SESSION_IDENTIFIER_KEY);
  },
};
