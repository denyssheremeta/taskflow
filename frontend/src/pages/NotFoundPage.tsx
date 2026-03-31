import { Link } from "react-router-dom";
import { AppShell } from "../components/app-shell";

export default function NotFoundPage() {
  return (
    <AppShell title="Page not found" subtitle="The route you requested does not exist in the frontend app.">
      <p className="panel-subtitle">
        Go back to <Link to="/login">login</Link>.
      </p>
    </AppShell>
  );
}
