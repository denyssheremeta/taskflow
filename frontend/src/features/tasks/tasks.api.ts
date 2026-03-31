import { api } from "../../api/client";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

type TasksResponse = {
  status: "success";
  data: {
    tasks: Task[];
  };
};

export async function getTasksRequest() {
  const response = await api.get<TasksResponse>("/tasks");
  return response.data;
}
