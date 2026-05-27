import { refreshAccessToken } from "@/lib/auth/refreshAccessToken";
import { authStorage } from "../auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: unknown,
  ) {
    super(message);
  }
}

// 🔒 empêche plusieurs refresh en parallèle
let refreshPromise: Promise<string> | null = null;

async function getToken() {
  return authStorage.getAccessToken();
}

async function refreshTokenOnce() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken()
      .then((token) => {
        authStorage.setAccessToken(token);
        return token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  retry = false,
): Promise<T> {
  const token = await getToken();
  console.log("TOKEN USED:", token);
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError("Serveur inaccessible", 0);
  }

  const data = await response.json().catch(() => null);

  // 🔥 401 → refresh
  if (response.status === 401 && !retry) {
    try {
      console.log("🔥 401 → refresh triggered");

      const newToken = await refreshTokenOnce();
      console.log("NEW TOKEN:", newToken);
      console.log("🔄 new token received");

      const retryHeaders = new Headers(options.headers);
      retryHeaders.set("Content-Type", "application/json");
      retryHeaders.set("Authorization", `Bearer ${newToken}`);

      const retryResponse = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: retryHeaders,
      });

      const retryData = await retryResponse.json().catch(() => null);

      if (!retryResponse.ok) {
        throw new ApiError(
          retryData?.message ?? "Erreur serveur",
          retryResponse.status,
          retryData?.errors,
        );
      }

      return retryData as T;
    } catch (e) {
      console.error("Refresh failed", e);

      authStorage.clear();
      window.location.href = "/";

      throw new ApiError("Session expirée", 401);
    }
  }

  if (!response.ok) {
    throw new ApiError(
      data?.message ?? "Erreur serveur",
      response.status,
      data?.errors,
    );
  }

  return data as T;
}
