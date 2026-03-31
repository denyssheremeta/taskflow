import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/protected-route";
import { PublicOnlyRoute } from "../components/public-only-route";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import TasksPage from "../pages/TasksPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/tasks" replace />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/tasks",
        element: <TasksPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
