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

export async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const accessToken = authStorage.getAccessToken();

  const headers = new Headers(options?.headers);

  headers.set("Content-Type", "application/json");

  if (accessToken) {
    headers.set(
      "Authorization",
      `Bearer ${accessToken}`,
    );
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError("Serveur inaccessible", 0, null);
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
