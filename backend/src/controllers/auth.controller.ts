import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { AppError } from "../utils/app-error";
import { sendSuccess } from "../utils/api-response";

export async function registerController(req: Request, res: Response) {
  const result = await registerUser(req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
}

export async function loginController(req: Request, res: Response) {
  const result = await loginUser(req.body);

  return sendSuccess(res, {
    message: "Login successful",
    data: result,
  });
}

export async function getCurrentUserController(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError("Authenticated user was not attached to request", 500);
  }

  return sendSuccess(res, {
    data: {
      user: req.user,
    },
  });
}
