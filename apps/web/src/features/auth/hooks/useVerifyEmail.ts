import { useCallback, useEffect, useState } from "react";
import { authService } from "../services/auth.service";

type VerifyState = "loading" | "success" | "error";

export function useVerifyEmail(token: string) {
  const [state, setState] = useState<VerifyState>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const verify = useCallback(async () => {
    if (!token) {
      setErrorMessage("Lien de vérification invalide.");
      setState("error");
      return;
    }

    try {
      await authService.verifyEmail(token);
      setState("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue");
      setState("error");
    }
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  return {
    loading: state === "loading",
    success: state === "success",
    error: state === "error",
    errorMessage,
  };
}