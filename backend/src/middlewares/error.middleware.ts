import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { env } from "../config/env";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    ...(env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
