import { request } from "@/lib/api/request";
import { authStorage } from "@/lib/auth";

export async function refreshAccessToken() {
  const refreshToken = authStorage.getRefreshToken();
  console.log("🔄 refreshing token...");
  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const data = await request<{
    accessToken: string;
    refreshToken: string;
  }>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  authStorage.setAccessToken(data.accessToken);
  authStorage.setRefreshToken(data.refreshToken);

  return data.accessToken;
}
