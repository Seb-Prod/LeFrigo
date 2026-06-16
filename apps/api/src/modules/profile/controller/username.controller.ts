import { Request, Response } from "express";
import { changeUsernameSchema } from "packages/shared/dist";
import { profileService } from "../profile.service";
import { handleError } from "apps/api/src/core/errors/handleError";

export const usernameController = {
  changeUsername: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      const result = changeUsernameSchema.safeParse(req.body);

      if (!result.success) {
        console.log(req.body)
        console.log(result)
        return res.status(400).json({
    
          message: "Données invalides",
          errors: result.error.issues,
        });
      }

      const response = await profileService.changeUsername(
        req.user.id,
        result.data.userName,
      );

      return res.json(response);
    } catch (error) {
      return handleError(error, res);
    }
  },
};
