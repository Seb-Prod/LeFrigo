import { useAuth } from "@/contexts/auth.context";
import { authService } from "@/features/auth";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { ChangeUsernameDto, changeUsernameSchema } from "@lefrigo/shared";
import { useCallback } from "react";


export function useChangeUsername() {
  const { updateUser } = useAuth();

  const onSubmit = useCallback(async (data: ChangeUsernameDto) => {
    console.log(data)
    await authService.changeUsername(data);
    console.log("api changement fait")
    const user = await authService.me();
    updateUser(user);
  }, [updateUser]);

  return useFormSubmit({
    schema: changeUsernameSchema,
    initialFields: { userName: "Admin001" },
    onSubmit,
  });
}
