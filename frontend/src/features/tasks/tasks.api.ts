import { api } from "../../api/client";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TaskFormValues = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
};

type TasksResponse = {
  status: "success";
  data: {
    tasks: Task[];
  };
};

type TaskResponse = {
  status: "success";
  message?: string;
  data: {
    task: Task;
  };
};

export async function getTasksRequest() {
  const response = await api.get<TasksResponse>("/tasks");
  return response.data;
}

export async function createTaskRequest(values: TaskFormValues) {
  const response = await api.post<TaskResponse>("/tasks", {
    title: values.title,
    description: values.description || null,
    status: values.status,
    dueDate: values.dueDate || null,
  });

  return response.data;
}

export async function updateTaskRequest(taskId: string, values: TaskFormValues) {
  const response = await api.patch<TaskResponse>(`/tasks/${taskId}`, {
    title: values.title,
    description: values.description || null,
    status: values.status,
    dueDate: values.dueDate || null,
  });

  return response.data;
}

export async function updateTaskStatusRequest(taskId: string, status: TaskStatus) {
  const response = await api.patch<TaskResponse>(`/tasks/${taskId}`, {
    status,
  });

  return response.data;
}

export async function deleteTaskRequest(taskId: string) {
  await api.delete(`/tasks/${taskId}`);
}
