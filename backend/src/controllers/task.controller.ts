import { Request, Response } from "express";
import { createTask, deleteTask, getMyTasks, getTaskById, updateTask } from "../services/task.service";
import { AppError } from "../utils/app-error";
import { sendSuccess } from "../utils/api-response";

function getAuthenticatedUserId(req: Request) {
  if (!req.user) {
    throw new AppError("Authenticated user was not attached to request", 500);
  }

  return req.user.id;
}

function getTaskIdFromParams(req: Request) {
  return String(req.params.id);
}

export async function getMyTasksController(req: Request, res: Response) {
  const tasks = await getMyTasks(getAuthenticatedUserId(req));

  return sendSuccess(res, {
    data: {
      tasks,
    },
  });
}

export async function getTaskByIdController(req: Request, res: Response) {
  const task = await getTaskById(getTaskIdFromParams(req), getAuthenticatedUserId(req));

  return sendSuccess(res, {
    data: {
      task,
    },
  });
}

export async function createTaskController(req: Request, res: Response) {
  const task = await createTask(getAuthenticatedUserId(req), req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: "Task created successfully",
    data: {
      task,
    },
  });
}

export async function updateTaskController(req: Request, res: Response) {
  const task = await updateTask(getTaskIdFromParams(req), getAuthenticatedUserId(req), req.body);

  return sendSuccess(res, {
    message: "Task updated successfully",
    data: {
      task,
    },
  });
}

export async function deleteTaskController(req: Request, res: Response) {
  await deleteTask(getTaskIdFromParams(req), getAuthenticatedUserId(req));

  res.status(204).send();
}
