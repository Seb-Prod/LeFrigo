import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getUsers);

router.post("/", userController.createUser);

export default router;
