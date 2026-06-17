import { authService } from "@/features/auth";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { changeUsernameSchema } from "@lefrigo/shared";

export function useChangeUsername() {
  return useFormSubmit({
    schema: changeUsernameSchema,
    initialFields: { userName: "" },
    onSubmit: (data) => authService.changeUsername(data),
  });
}