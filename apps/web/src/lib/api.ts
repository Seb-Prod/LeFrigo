import { User } from "@shared/types/user.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error("Email ou mot de passe incorrect");

        case 429:
          throw new Error("Trop de tentatives de connexion");

        case 500:
          throw new Error("Erreur serveur");

        default:
          throw new Error("Impossible de se connecter");
      }
    }

    return response.json();
  },

  async getUsers(token: string): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    return response.json();
  },
};
