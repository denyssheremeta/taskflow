import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../components/app-shell";
import { AuthForm } from "../features/auth/auth-form";
import { getApiErrorMessage } from "../features/auth/auth-errors";
import { useLoginMutation } from "../features/auth/use-auth-mutations";
import { setAccessToken } from "../features/auth/token-storage";
import { queryClient } from "../app/query-client";
import { authKeys } from "../features/auth/auth.keys";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLoginMutation();

  async function handleSubmit(values: { email: string; password: string }) {
    const response = await loginMutation.mutateAsync(values);

    setAccessToken(response.data.token);
    await queryClient.invalidateQueries({ queryKey: authKeys.currentUser });

    const nextPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/tasks";
    navigate(nextPath, { replace: true });
  }

  return (
    <AppShell title="Welcome back" subtitle="Log in to manage your tasks and continue where you left off.">
      <AuthForm
        mode="login"
        onSubmit={handleSubmit}
        isSubmitting={loginMutation.isPending}
        errorMessage={loginMutation.error ? getApiErrorMessage(loginMutation.error) : null}
      />

      <p className="auth-footer">
        Don&apos;t have an account? <Link to="/register">Create one</Link>
      </p>
    </AppShell>
  );
}
