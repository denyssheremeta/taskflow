import { Router } from "express";
import authRouter from "./auth.routes";
import healthRouter from "./health.routes";
import taskRouter from "./task.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/health", healthRouter);
router.use("/tasks", taskRouter);

export default router;
