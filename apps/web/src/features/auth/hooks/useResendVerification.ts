import { useCallback, useState } from "react";
import { authService } from "../services/auth.service";

type ResendState = "idle" | "loading" | "success" | "error";

export function useResendVerification() {
  const [state, setState] = useState<ResendState>("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResend = useCallback(async (e: React.SubmitEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    try {
      await authService.resendVerification(email);
      setState("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue");
      setState("error");
    }
  }, [email]);

  return {
    email,
    setEmail,
    loading: state === "loading",
    success: state === "success",
    error: state === "error",
    errorMessage,
    handleResend,
  };
}