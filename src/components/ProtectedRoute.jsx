import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p className="p-8 text-center text-blue-900">Checking your session…</p>;
  if (!user) return <Navigate to="/auth/signin" replace state={{ from: location.pathname }} />;
  const role = String(user.role || user.userRole || "customer").toLowerCase();
  if (roles && !roles.includes(role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
