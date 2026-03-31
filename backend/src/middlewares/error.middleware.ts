import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { env } from "../config/env";
import { ZodError } from "zod";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

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
    ...(err instanceof AppError && err.details ? { errors: err.details } : {}),
    ...(env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
