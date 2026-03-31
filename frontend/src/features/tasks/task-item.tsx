import type { ReactNode } from "react";
import type { Task, TaskStatus } from "./tasks.api";
import { taskStatusOptions } from "./task-utils";

type TaskItemProps = {
  task: Task;
  isEditing: boolean;
  isDeleting: boolean;
  isUpdatingStatus: boolean;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  onStatusChange: (status: TaskStatus) => Promise<void>;
  children?: ReactNode;
};

const statusLabelMap: Record<TaskStatus, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

export function TaskItem({
  task,
  isEditing,
  isDeleting,
  isUpdatingStatus,
  onEdit,
  onDelete,
  onStatusChange,
  children,
}: TaskItemProps) {
  if (isEditing) {
    return (
      <article className="task-card">
        <div className="task-card-top">
          <div>
            <h3>Edit task</h3>
            <p className="task-description">Update the fields below and save your changes.</p>
          </div>

          <button className="button-danger" type="button" onClick={() => void onDelete()} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        {children}
      </article>
    );
  }

  return (
    <article className="task-card">
      <div className="task-card-top">
        <div>
          <h3>{task.title}</h3>
          <p className="task-description">{task.description || "No description yet."}</p>
        </div>

        <span className="status-badge">{statusLabelMap[task.status]}</span>
      </div>

      <div className="task-controls">
        <label className="field field-inline">
          <span>Status</span>
          <select
            value={task.status}
            onChange={(event) => onStatusChange(event.target.value as TaskStatus)}
            disabled={isUpdatingStatus}
          >
            {taskStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="task-actions">
          <button className="button-secondary" type="button" onClick={onEdit}>
            {isEditing ? "Editing" : "Edit"}
          </button>
          <button className="button-danger" type="button" onClick={() => void onDelete()} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="task-meta">
        <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}</span>
        <span>Updated: {new Date(task.updatedAt).toLocaleString()}</span>
      </div>
    </article>
  );
}
