"use client";

import { authStorage } from "@/lib/auth";
import { SafeUser, AuthResponse } from "@lefrigo/shared";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: SafeUser | null;
  accessToken: string | null;
  loading: boolean;

  login: (data: AuthResponse) => void;

  logout: () => void;

  // setSession: (accessToken: string, user: any) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Bootstrap session au reload

  useEffect(() => {
    const storedAccessToken = authStorage.getAccessToken();
    const storedUser = authStorage.getUser();

    if (storedAccessToken && storedUser) {
      setAccessToken(storedAccessToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (data: AuthResponse) => {
    authStorage.setAccessToken(data.accessToken);
    authStorage.setRefreshToken(data.refreshToken);
    authStorage.setUser(data.user);

    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = () => {
    authStorage.clear();

    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
