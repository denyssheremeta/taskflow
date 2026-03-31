import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { verifyToken } from "../utils/jwt";
import { getCurrentUser } from "../services/auth.service";

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(new AppError("Authorization header is required", 401));
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new AppError("Authorization header must use Bearer token", 401));
  }

  try {
    const payload = verifyToken(token);
    const user = await getCurrentUser(payload.userId);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
