import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { AppError } from "../utils/app-error";

export async function registerController(req: Request, res: Response) {
  const result = await registerUser(req.body);

  res.status(201).json({
    message: "User registered successfully",
    ...result,
  });
}

export async function loginController(req: Request, res: Response) {
  const result = await loginUser(req.body);

  res.status(200).json({
    message: "Login successful",
    ...result,
  });
}

export async function getCurrentUserController(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError("Authenticated user was not attached to request", 500);
  }

  res.status(200).json({
    user: req.user,
  });
}
