import { useMutation } from "@tanstack/react-query";
import {
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
  updateTaskStatusRequest,
} from "./tasks.api";
import type { TaskFormValues, TaskStatus } from "./tasks.api";

export function useCreateTaskMutation() {
  return useMutation({
    mutationFn: (values: TaskFormValues) => createTaskRequest(values),
  });
}

export function useUpdateTaskMutation() {
  return useMutation({
    mutationFn: ({ taskId, values }: { taskId: string; values: TaskFormValues }) =>
      updateTaskRequest(taskId, values),
  });
}

export function useUpdateTaskStatusMutation() {
  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatusRequest(taskId, status),
  });
}

export function useDeleteTaskMutation() {
  return useMutation({
    mutationFn: (taskId: string) => deleteTaskRequest(taskId),
  });
}
