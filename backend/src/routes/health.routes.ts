import { Router } from "express";
import { getHealthController } from "../controllers/health.controller";
import { asyncHandler } from "../utils/async-handler";

const healthRouter = Router();

healthRouter.get("/", asyncHandler(async (req, res) => getHealthController(req, res)));

export default healthRouter;
