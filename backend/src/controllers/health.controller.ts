import { Request, Response } from "express";
import { getHealthStatus } from "../services/health.service";
import { sendSuccess } from "../utils/api-response";

export function getHealthController(_req: Request, res: Response) {
  const healthStatus = getHealthStatus();

  return sendSuccess(res, {
    data: {
      health: healthStatus,
    },
  });
}
