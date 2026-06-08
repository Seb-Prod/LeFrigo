import { useCallback, useEffect, useState } from "react";
import { authService } from "../services/auth.service";

type VerifyState =
  | "loading"
  | "success"
  | "already-verified"
  | "expired"
  | "invalid";

export function useVerifyEmail(token: string) {
  const [state, setState] = useState<VerifyState>("loading");

  const verify = useCallback(async () => {
    if (!token) {
      setState("invalid");
      return;
    }

    try {
      await authService.verifyEmail(token);
      setState("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";

      if (message === "EMAIL_ALREADY_VERIFIED") setState("already-verified");
      else if (message === "TOKEN_EXPIRED") setState("expired");
      else setState("invalid");
    }
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  return {
    loading: state === "loading",
    success: state === "success",
    alreadyVerified: state === "already-verified",
    expired: state === "expired",
    invalid: state === "invalid",
  };
}
