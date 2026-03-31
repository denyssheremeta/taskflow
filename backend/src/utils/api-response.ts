import { Response } from "express";

type SuccessResponseOptions = {
  statusCode?: number;
  message?: string;
  data?: Record<string, unknown>;
};

type ErrorResponseOptions = {
  statusCode: number;
  message: string;
  errors?: unknown;
  stack?: string;
};

export function sendSuccess(res: Response, options: SuccessResponseOptions = {}) {
  const { statusCode = 200, message, data } = options;

  return res.status(statusCode).json({
    status: "success",
    ...(message ? { message } : {}),
    ...(data ? { data } : {}),
  });
}

export function sendError(res: Response, options: ErrorResponseOptions) {
  const { statusCode, message, errors, stack } = options;

  return res.status(statusCode).json({
    status: "error",
    message,
    ...(errors ? { errors } : {}),
    ...(stack ? { stack } : {}),
  });
}
