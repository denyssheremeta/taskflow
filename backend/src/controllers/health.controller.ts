import { Request, Response } from "express";
import { getHealthStatus } from "../services/health.service";

export function getHealthController(_req: Request, res: Response) {
  const healthStatus = getHealthStatus();

  res.status(200).json(healthStatus);
}
