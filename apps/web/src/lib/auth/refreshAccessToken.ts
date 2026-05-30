import { authStorage } from "@/lib/auth";

const AP_URL = process.env.NEXT_PUBLIC_API_URL;

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = authStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("Missing refresh token");
  }

  const response = await fetch(`${AP_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Refresh failed");
  }

  const data = await response.json();

  authStorage.setAccessToken(data.accessToken);
  authStorage.setRefreshToken(data.refreshToken);
  authStorage.setSessionIdentifier(data.sessionIdentifier);

  return data.accessToken;
}
