import { prisma } from "../db/prisma";
import { AppError } from "../utils/app-error";
import { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema";
import { taskSelect } from "../types/task";

async function findOwnedTaskOrThrow(taskId: string, userId: string) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
    select: taskSelect,
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
}

export async function getMyTasks(userId: string) {
  return prisma.task.findMany({
    where: {
      userId,
    },
    select: taskSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getTaskById(taskId: string, userId: string) {
  return findOwnedTaskOrThrow(taskId, userId);
}

export async function createTask(userId: string, data: CreateTaskInput) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      status: data.status,
      dueDate: data.dueDate ?? null,
      userId,
    },
    select: taskSelect,
  });
}

export async function updateTask(taskId: string, userId: string, data: UpdateTaskInput) {
  await findOwnedTaskOrThrow(taskId, userId);

  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.dueDate !== undefined ? { dueDate: data.dueDate } : {}),
    },
    select: taskSelect,
  });
}

export async function deleteTask(taskId: string, userId: string) {
  await findOwnedTaskOrThrow(taskId, userId);

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
}
