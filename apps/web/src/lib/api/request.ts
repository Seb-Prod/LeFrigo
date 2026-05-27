import { refreshAccessToken } from "@/lib/auth/refreshAccessToken";
import { authStorage } from "../auth";
import { getRefreshPromise, setRefreshPromise } from "@/lib/auth/tokenManager";

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

export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const executeRequest = async (token?: string | null) => {
    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  };

  let response = await executeRequest(authStorage.getAccessToken());

  if (response.status === 401) {
    try {
      let refreshPromise = getRefreshPromise();

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          setRefreshPromise(null);
        });
        setRefreshPromise(refreshPromise);
      }
      const newToken = await refreshPromise;

      response = await executeRequest(newToken);
    } catch {
      authStorage.clear();
      window.location.href = "/";
      return Promise.reject(new ApiError("Session expirée", 401));
    }
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.message ?? "Erreur serveur",
      response.status,
      data?.errors,
    );
  }

  return data as T;
}
