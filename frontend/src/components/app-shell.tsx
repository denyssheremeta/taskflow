import type { ReactNode } from "react";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function AppShell({ title, subtitle, children }: AppShellProps) {
  return (
    <main className="page-shell">
      <section className="panel">
        <header className="panel-header">
          <p className="eyebrow">TaskFlow</p>
          <h1>{title}</h1>
          {subtitle ? <p className="panel-subtitle">{subtitle}</p> : null}
        </header>

        {children}
      </section>
    </main>
  );
}
