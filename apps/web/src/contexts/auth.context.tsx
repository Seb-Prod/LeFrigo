"use client";

import { createContext, useContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState(() => ({
    token:
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null,
    loading: false,
  }));

  const login = (token: string) => {
    localStorage.setItem("token", token);

    setAuth({
      token,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");

    setAuth({
      token: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        loading: auth.loading,
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