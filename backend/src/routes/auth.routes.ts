import { Router } from "express";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { asyncHandler } from "../utils/async-handler";

const authRouter = Router();

authRouter.post("/register", validate({ body: registerSchema }), asyncHandler(registerController));
authRouter.post("/login", validate({ body: loginSchema }), asyncHandler(loginController));
authRouter.get("/me", requireAuth, asyncHandler(getCurrentUserController));

export default authRouter;
