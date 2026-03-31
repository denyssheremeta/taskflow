import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/use-auth";

export function ProtectedRoute() {
  const location = useLocation();
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div className="page-state">Loading your session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
