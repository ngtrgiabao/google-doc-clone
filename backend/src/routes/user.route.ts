import { Router } from "express";
import { userValidator } from "../validators/user.validator";
import { userController } from "../controllers/user/user.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/", userValidator.register, userController.register);
router.get("/:id", authenticate, userController.getUser);
router.post("/reset-password")

export default router;
