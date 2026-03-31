import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/use-auth";

export function PublicOnlyRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div className="page-state">Checking session...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
}
