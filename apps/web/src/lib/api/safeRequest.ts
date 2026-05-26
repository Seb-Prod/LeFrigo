import { ApiError } from "./request";
import { fetchWithAuth } from "./fetchWithAuth";
import { refreshAccessToken } from "@/lib/auth/refreshAccessToken";
import { authStorage } from "@/lib/auth";

export async function safeRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  let response = await fetchWithAuth(endpoint, options);

  if (response.status !== 401) {
    const data = await response.json().catch(() => null);
    return data as T;
  }

  try {
    await refreshAccessToken();

    response = await fetchWithAuth(endpoint, options);

    if (!response.ok) {
      throw new ApiError("Session expirée", 401);
    }

    return await response.json();
  } catch {
    authStorage.clear();
    window.location.href = "/";
    throw new ApiError("Session expirée", 401);
  }
}