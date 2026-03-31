import type { Task, TaskFormValues } from "./tasks.api";

export const taskStatusOptions = [
  { value: "TODO", label: "To do" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "DONE", label: "Done" },
] as const;

export function getTaskFormInitialValues(task?: Task | null): TaskFormValues {
  return {
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "TODO",
    dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : "",
  };
}
