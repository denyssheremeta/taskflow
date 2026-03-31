import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { env } from "../config/env";
import { ZodError } from "zod";
import { sendError } from "../utils/api-response";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return sendError(res, {
      statusCode: 400,
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

  return sendError(res, {
    statusCode,
    message,
    errors: err instanceof AppError ? err.details : undefined,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
