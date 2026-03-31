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

const taskRouter = Router();

taskRouter.use(requireAuth);

taskRouter.get("/", getMyTasksController);
taskRouter.get("/:id", validate({ params: taskIdParamsSchema }), getTaskByIdController);
taskRouter.post("/", validate({ body: createTaskSchema }), createTaskController);
taskRouter.patch(
  "/:id",
  validate({
    params: taskIdParamsSchema,
    body: updateTaskSchema,
  }),
  updateTaskController,
);
taskRouter.delete("/:id", validate({ params: taskIdParamsSchema }), deleteTaskController);

export default taskRouter;
