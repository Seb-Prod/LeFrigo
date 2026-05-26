import { authStorage } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function fetchWithAuth(endpoint: string, options?: RequestInit) {
  const accessToken = authStorage.getAccessToken();

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options?.headers,
    },
  });
}