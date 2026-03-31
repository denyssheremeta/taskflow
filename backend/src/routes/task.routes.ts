import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getMyTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/task.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createTaskSchema,
  taskIdParamsSchema,
  updateTaskSchema,
} from "../schemas/task.schema";
import { asyncHandler } from "../utils/async-handler";

const taskRouter = Router();

taskRouter.use(requireAuth);

taskRouter.get("/", asyncHandler(getMyTasksController));
taskRouter.get("/:id", validate({ params: taskIdParamsSchema }), asyncHandler(getTaskByIdController));
taskRouter.post("/", validate({ body: createTaskSchema }), asyncHandler(createTaskController));
taskRouter.patch(
  "/:id",
  validate({
    params: taskIdParamsSchema,
    body: updateTaskSchema,
  }),
  asyncHandler(updateTaskController),
);
taskRouter.delete("/:id", validate({ params: taskIdParamsSchema }), asyncHandler(deleteTaskController));

export default taskRouter;
