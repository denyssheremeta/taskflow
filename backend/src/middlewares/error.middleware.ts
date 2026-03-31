import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { env } from "../config/env";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError || env.NODE_ENV === "development"
      ? err.message
      : "Internal Server Error";

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    status: "error",
    message,
    ...(env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
