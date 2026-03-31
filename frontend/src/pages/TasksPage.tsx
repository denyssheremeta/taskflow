import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../app/query-client";
import { useAuth } from "../features/auth/use-auth";
import { authKeys } from "../features/auth/auth.keys";
import { removeAccessToken } from "../features/auth/token-storage";
import { TaskForm } from "../features/tasks/task-form";
import { TaskItem } from "../features/tasks/task-item";
import { taskKeys } from "../features/tasks/task.keys";
import type { Task, TaskFormValues, TaskStatus } from "../features/tasks/tasks.api";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
} from "../features/tasks/use-task-mutations";
import { useTasksQuery } from "../features/tasks/use-tasks-query";

export default function TasksPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const tasksQuery = useTasksQuery();
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const updateTaskStatusMutation = useUpdateTaskStatusMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function refreshTasks() {
    await queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
  }

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  async function handleLogout() {
    removeAccessToken();
    queryClient.removeQueries({ queryKey: authKeys.currentUser });
    queryClient.removeQueries({ queryKey: taskKeys.all });
    navigate("/login", { replace: true });
  }

  async function handleCreateTask(values: TaskFormValues) {
    await createTaskMutation.mutateAsync(values);
    setIsCreateFormOpen(false);
    setSuccessMessage("Task created successfully.");
    await refreshTasks();
  }

  async function handleUpdateTask(taskId: string, values: TaskFormValues) {
    await updateTaskMutation.mutateAsync({ taskId, values });
    setEditingTaskId(null);
    setSuccessMessage("Task updated successfully.");
    await refreshTasks();
  }

  async function handleStatusChange(taskId: string, status: TaskStatus) {
    await updateTaskStatusMutation.mutateAsync({ taskId, status });
    setSuccessMessage("Task status updated.");
    await refreshTasks();
  }

  async function handleDeleteTask(taskId: string) {
    await deleteTaskMutation.mutateAsync(taskId);

    if (editingTaskId === taskId) {
      setEditingTaskId(null);
    }

    setSuccessMessage("Task deleted successfully.");
    await refreshTasks();
  }

  function getTaskMutationState(taskId: string) {
    return {
      isDeleting: deleteTaskMutation.isPending && deleteTaskMutation.variables === taskId,
      isUpdatingStatus:
        updateTaskStatusMutation.isPending && updateTaskStatusMutation.variables?.taskId === taskId,
      isUpdating: updateTaskMutation.isPending && updateTaskMutation.variables?.taskId === taskId,
    };
  }

  const editingTask = tasksQuery.data?.find((task) => task.id === editingTaskId) ?? null;
  const hasTasks = Boolean(tasksQuery.data?.length);
  const shouldShowCreateCard = !hasTasks || isCreateFormOpen;

  return (
    <main className="page-shell">
      <section className="panel stack-lg">
        <div className="tasks-header">
          <div>
            <p className="eyebrow">TaskFlow</p>
            <h1>Your tasks</h1>
            <p className="panel-subtitle">
              Signed in as <strong>{user?.email}</strong>
            </p>
          </div>

          <button type="button" className="button-secondary" onClick={handleLogout}>
            Log out
          </button>
        </div>

        <section className="stack-md">
          {successMessage ? <div className="notice-success">{successMessage}</div> : null}

          {tasksQuery.isPending ? <div className="page-state">Loading your tasks...</div> : null}

          {tasksQuery.isError ? (
            <div className="page-state page-state-error">
              Failed to load tasks. Make sure the backend is running and your token is still valid.
            </div>
          ) : null}

          {hasTasks ? (
            <div className="section-header">
              <div>
                <h2>Your task list</h2>
                <p className="panel-subtitle">Manage your tasks below and open the form only when you need it.</p>
              </div>

              {!isCreateFormOpen ? (
                <button type="button" className="button-primary" onClick={() => setIsCreateFormOpen(true)}>
                  Add new task
                </button>
              ) : null}
            </div>
          ) : null}

          {shouldShowCreateCard ? (
            <div className="card">
              <h2>{hasTasks ? "Create a task" : "Create your first task"}</h2>
              <p>
                {hasTasks
                  ? "This form sends a protected POST request and refreshes the task list after success."
                  : "You do not have any tasks yet. Start by adding your first one."}
              </p>

              <TaskForm
                mode="create"
                onSubmit={handleCreateTask}
                onCancel={hasTasks ? () => setIsCreateFormOpen(false) : undefined}
                isSubmitting={createTaskMutation.isPending}
                error={createTaskMutation.error}
              />
            </div>
          ) : null}

          {tasksQuery.data && tasksQuery.data.length === 0 ? (
            <div className="card">
              <h2>No tasks yet</h2>
              <p>Your list will appear here right after the first successful create request.</p>
            </div>
          ) : null}

          {tasksQuery.data?.map((task: Task) => {
            const mutationState = getTaskMutationState(task.id);

            return (
              <TaskItem
                key={task.id}
                task={task}
                isEditing={editingTaskId === task.id}
                isDeleting={mutationState.isDeleting}
                isUpdatingStatus={mutationState.isUpdatingStatus}
                onEdit={() => setEditingTaskId(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                onStatusChange={(status) => handleStatusChange(task.id, status)}
              >
                {editingTask?.id === task.id ? (
                  <div className="task-editor">
                    <TaskForm
                      mode="edit"
                      task={editingTask}
                      onSubmit={(values) => handleUpdateTask(task.id, values)}
                      onCancel={() => setEditingTaskId(null)}
                      isSubmitting={mutationState.isUpdating}
                      error={mutationState.isUpdating ? updateTaskMutation.error : null}
                    />
                  </div>
                ) : null}
              </TaskItem>
            );
          })}
        </section>
      </section>
    </main>
  );
}
