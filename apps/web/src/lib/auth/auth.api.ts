import type { UserSession } from "@lefrigo/shared";

import { request } from "../api/request";

export const authApi = {
  getSessions: async () => {
    return request<UserSession[]>("/auth/sessions");
  },

  revokeSession: async (sessionId: string) => {
    return request(`/auth/sessions/${sessionId}`, {
      method: "DELETE",
    });
  },
};