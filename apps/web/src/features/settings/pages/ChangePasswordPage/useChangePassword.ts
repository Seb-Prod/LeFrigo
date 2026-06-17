import { authService } from "@/features/auth";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { changePasswordSchema } from "@lefrigo/shared";

export function useChangePassword() {
  return useFormSubmit({
    schema: changePasswordSchema,
    initialFields: { password: "", newPassword: "", confirmNewPassword: "" },
    onSubmit: (data) => authService.changePassword(data),
    errorMap: {
      INVALID_PASSWORD: "Mot de passe actuel incorrect.",
      SAME_PASSWORD: "Le nouveau mot de passe doit être différent de l'ancien.",
    },
  });
}