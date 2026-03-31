import type { FormEvent } from "react";
import { useState } from "react";

type AuthFormValues = {
  email: string;
  password: string;
};

type AuthFormProps = {
  mode: "login" | "register";
  onSubmit: (values: AuthFormValues) => Promise<void>;
  isSubmitting: boolean;
  errorMessage: string | null;
};

export function AuthForm({ mode, onSubmit, isSubmitting, errorMessage }: AuthFormProps) {
  const [values, setValues] = useState<AuthFormValues>({
    email: "",
    password: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(values);
  }

  return (
    <form className="stack-md" onSubmit={handleSubmit}>
      <label className="field">
        <span>Email</span>
        <input
          type="email"
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          type="password"
          value={values.password}
          onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
          placeholder="At least 8 characters"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
        />
      </label>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      <button className="button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
      </button>
    </form>
  );
}
