import { useNavigate } from "react-router-dom";
import { queryClient } from "../app/query-client";
import { useAuth } from "../features/auth/use-auth";
import { authKeys } from "../features/auth/auth.keys";
import { removeAccessToken } from "../features/auth/token-storage";
import { useTasksQuery } from "../features/tasks/use-tasks-query";

const statusLabelMap = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
} as const;

export default function TasksPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const tasksQuery = useTasksQuery();

  async function handleLogout() {
    removeAccessToken();
    queryClient.removeQueries({ queryKey: authKeys.currentUser });
    queryClient.removeQueries({ queryKey: ["tasks"] });
    navigate("/login", { replace: true });
  }

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
          <div className="card">
            <h2>Protected route is working</h2>
            <p>
              This page calls the protected <code>/api/tasks</code> endpoint with your Bearer token.
            </p>
          </div>

          {tasksQuery.isPending ? <div className="page-state">Loading your tasks...</div> : null}

          {tasksQuery.isError ? (
            <div className="page-state page-state-error">
              Failed to load tasks. Make sure the backend is running and your token is still valid.
            </div>
          ) : null}

          {tasksQuery.data && tasksQuery.data.length === 0 ? (
            <div className="card">
              <h2>No tasks yet</h2>
              <p>You are authenticated correctly. Next we can build create/update/delete UI on top of this.</p>
            </div>
          ) : null}

          {tasksQuery.data?.map((task) => (
            <article key={task.id} className="task-card">
              <div className="task-card-top">
                <h3>{task.title}</h3>
                <span className="status-badge">{statusLabelMap[task.status]}</span>
              </div>

              <p>{task.description || "No description yet."}</p>

              <div className="task-meta">
                <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}</span>
                <span>Updated: {new Date(task.updatedAt).toLocaleString()}</span>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
