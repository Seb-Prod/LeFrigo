import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "apps/api/src/core/auth/auth.middleware";
import { roleMiddleware } from "apps/api/src/core/auth/role.middleware";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", authMiddleware, roleMiddleware(UserRole.ADMIN), userController.getUsers);

// router.post("/", userController.createUser);

export default router;
