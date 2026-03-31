import { Link, useNavigate } from "react-router-dom";
import { AppShell } from "../components/app-shell";
import { queryClient } from "../app/query-client";
import { AuthForm } from "../features/auth/auth-form";
import { getApiErrorMessage } from "../features/auth/auth-errors";
import { authKeys } from "../features/auth/auth.keys";
import { setAccessToken } from "../features/auth/token-storage";
import { useRegisterMutation } from "../features/auth/use-auth-mutations";

export default function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  async function handleSubmit(values: { email: string; password: string }) {
    const response = await registerMutation.mutateAsync(values);

    setAccessToken(response.data.token);
    await queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
    navigate("/tasks", { replace: true });
  }

  return (
    <AppShell title="Create your account" subtitle="Start with simple authentication flow before we build the rest of the UI.">
      <AuthForm
        mode="register"
        onSubmit={handleSubmit}
        isSubmitting={registerMutation.isPending}
        errorMessage={registerMutation.error ? getApiErrorMessage(registerMutation.error) : null}
      />

      <p className="auth-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </AppShell>
  );
}
