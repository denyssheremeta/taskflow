import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../auth/auth-errors";
import type { Task, TaskFormValues } from "./tasks.api";
import { getTaskFormInitialValues, taskStatusOptions } from "./task-utils";

type TaskFormProps = {
  mode: "create" | "edit";
  task?: Task | null;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  onCancel?: () => void;
  isSubmitting: boolean;
  error: unknown;
};

export function TaskForm({ mode, task, onSubmit, onCancel, isSubmitting, error }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(() => getTaskFormInitialValues(task));

  useEffect(() => {
    setValues(getTaskFormInitialValues(task));
  }, [task]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(values);

    if (mode === "create") {
      setValues(getTaskFormInitialValues(null));
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-grid">
        <label className="field">
          <span>Title</span>
          <input
            type="text"
            value={values.title}
            onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
            placeholder="Prepare weekly report"
            required
          />
        </label>

        <label className="field">
          <span>Status</span>
          <select
            value={values.status}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                status: event.target.value as TaskFormValues["status"],
              }))
            }
          >
            {taskStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field field-span-full">
          <span>Description</span>
          <textarea
            value={values.description}
            onChange={(event) => setValues((current) => ({ ...current, description: event.target.value }))}
            placeholder="What needs to be done?"
            rows={4}
          />
        </label>

        <label className="field">
          <span>Due date</span>
          <input
            type="date"
            value={values.dueDate}
            onChange={(event) => setValues((current) => ({ ...current, dueDate: event.target.value }))}
          />
        </label>
      </div>

      {error ? <p className="form-error">{getApiErrorMessage(error)}</p> : null}

      <div className="task-form-actions">
        <button className="button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : mode === "create" ? "Create task" : "Save changes"}
        </button>

        {onCancel ? (
          <button className="button-secondary" type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
