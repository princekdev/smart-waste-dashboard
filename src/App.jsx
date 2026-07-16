import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardApp from "./pages/DashboardApp";

/**
 * Acts as the app's protected route gate: unauthenticated users only
 * ever see LoginPage; the dashboard and all its sub-pages are only
 * reachable once a mock session exists in AuthContext.
 */
export default function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <DashboardApp /> : <LoginPage />;
}
