import { Router } from "express";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const authRouter = Router();

authRouter.post("/register", validate({ body: registerSchema }), registerController);
authRouter.post("/login", validate({ body: loginSchema }), loginController);
authRouter.get("/me", requireAuth, getCurrentUserController);

export default authRouter;
