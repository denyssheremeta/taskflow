import { Request, Response } from "express";
import { createTask, deleteTask, getMyTasks, getTaskById, updateTask } from "../services/task.service";
import { AppError } from "../utils/app-error";

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

  res.status(200).json({
    tasks,
  });
}

export async function getTaskByIdController(req: Request, res: Response) {
  const task = await getTaskById(getTaskIdFromParams(req), getAuthenticatedUserId(req));

  res.status(200).json({
    task,
  });
}

export async function createTaskController(req: Request, res: Response) {
  const task = await createTask(getAuthenticatedUserId(req), req.body);

  res.status(201).json({
    message: "Task created successfully",
    task,
  });
}

export async function updateTaskController(req: Request, res: Response) {
  const task = await updateTask(getTaskIdFromParams(req), getAuthenticatedUserId(req), req.body);

  res.status(200).json({
    message: "Task updated successfully",
    task,
  });
}

export async function deleteTaskController(req: Request, res: Response) {
  await deleteTask(getTaskIdFromParams(req), getAuthenticatedUserId(req));

  res.status(204).send();
}
